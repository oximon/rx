import jwt_decode from 'jwt-decode';
import Cookie from 'cookie';
import { isEmpty, some } from 'lodash-core';

import type { SingletonRouter } from 'next/router';
import type { NextPageContext } from 'next';

import { ARRAY_SUCCES_STATUS_CODES } from '../constants/auxiliary.constants';

export const checkLengthArr = (arr: any[]) => arr && arr.length > 0;

export const isBrowser = (): boolean => typeof window !== 'undefined';

export const redirect = (params: {
  status?: number;
  location: string;
  Router: SingletonRouter;
  ctx: NextPageContext;
}): void => {
  const { Router, ctx, location, status = 302 } = params;
  if (ctx.res) {
    // Seems to be the version used by zeit
    ctx.res.writeHead(status, {
      Location: location,
      // Add the content-type for SEO considerations
      'Content-Type': 'text/html; charset=utf-8',
    });
    ctx.res.end();
    return;
  }

  Router.replace(location);
};

export const getOptionsToCookie = (obj: any = {}): any => {
  return {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    ...obj,
  };
};
export const isProtectedPage = (url: string, pagesArr: string): boolean => {
  const protectedPages = pagesArr.split(' ');
  if (!protectedPages || !url) return false;
  return protectedPages.includes(url);
};

export const setCookie = ({
  name,
  value,
  options = {},
}: {
  name: string;
  value: any;
  options?: any;
}): any => {
  if (!name) throw new Error('Наименование куки не задана');
  return Cookie.serialize(name, value, options);
};

export const getCookie = (headers: any): any => {
  let result = {};
  if (!headers || !headers?.cookie) return result;
  const { cookie } = headers;
  result = Cookie.parse(cookie);
  return result;
};

export const isUserAdmin = (roles: string[]): boolean =>
  some(roles, (item) => item.toLowerCase() === 'admin');

export const getToken = (tokenIn: string): any => {
  if (!tokenIn) return;
  return currentToken(getDecodeToken(tokenIn));
};

const filterFalseValues = (obj: any): any =>
  Object.keys(obj).reduce((acc, key) => {
    if (obj[key]) acc[key] = obj[key];
    return acc;
  }, {});

export const newArray = (length: number): number[] =>
  Array.from({ length }, (v, el) => el + 1);

export const createQueryString = (
  queryStart: string,
  objectParams?: any
): string => {
  let filteredObj = '';

  if (!isEmpty(objectParams)) filteredObj = filterFalseValues(objectParams);

  return (
    queryStart +
    (filteredObj ? '?' : '') +
    new URLSearchParams(filteredObj).toString()
  );
};

export const getDecodeToken = (token: string): any => {
  if (token) return jwt_decode(token);
  return null;
};

const currentToken = (
  decodeToken: any,
  time: number = Date.now() / 1000
): any => {
  if (decodeToken && decodeToken.exp && decodeToken.exp > time)
    return decodeToken;
  return null;
};

export const requestWrapper = async ({
  request,
  setLoading,
  onErrorHandler,
  onSuccessHandler,
}: {
  request: any;
  setLoading: (flag: boolean) => void;
  onErrorHandler: (result: any) => void;
  onSuccessHandler: (result: any) => void;
}): Promise<void> => {
  setLoading(true);

  const result = await request();
  let getFunc: any = () => '';
  if (
    result.statusCode &&
    !ARRAY_SUCCES_STATUS_CODES.includes(result.statusCode)
  ) {
    getFunc = () => onErrorHandler(result);
  } else {
    getFunc = () => onSuccessHandler(result);
  }
  await getFunc();
  setLoading(false);
};

export const onLocalStorageHandler = ({
  key,
  value = '',
  method,
}: {
  key: string;
  value?: any;
  method: string;
}): string | void => {
  switch (method) {
    case 'get':
      return localStorage.getItem(key);
    case 'set':
      return localStorage.setItem(key, value);
    case 'remove':
      return localStorage.removeItem(key);
    case 'clear':
      return localStorage.clear();
    default:
      return;
  }
};

export function errorHandler(result: any, callback: () => void): void {
  this.error = result;
  callback && callback();
}
