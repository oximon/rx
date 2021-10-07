import '../styles/globals.scss';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/navigation/navigation.scss';

import Router from 'next/router';

import App, { AppContext, AppProps } from 'next/app';

import { isEmpty } from 'lodash-core';

import {
  getCookie,
  getToken,
  isProtectedPage,
  redirect,
  setCookie,
} from '../lib/helpers';
import { authObject } from '../tcp/common';

import MainLayout from '../client/layouts';
import AuthProvider from '../client/components/authProvider';

const PROTECTED_PAGES: string = process.env.NEXT_PUBLIC_PROTECTED_PAGES;

function MyApp({
  Component,
  pageProps,
  access_token,
}: AppProps & { access_token: string }) {
  return (
    <AuthProvider access_token={access_token}>
      <MainLayout>
        <Component {...pageProps} />
        <div id='modal' />
      </MainLayout>
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { req, res } = appContext.ctx;

  let { access_token, refresh_token } = getCookie(req.headers);
  if (!access_token && refresh_token) {
    const getNewTokens = await authObject.getRefreshToken(refresh_token, {
      headers: {
        'user-agent': req.headers['user-agent'],
      },
    });

    if (!isEmpty(getNewTokens)) {
      const {
        access_token: access_token_new,
        refresh_token: refresh_token_new,
      } = getNewTokens;
      access_token = access_token_new.value;
      res.setHeader('Set-Cookie', [
        setCookie({
          name: 'access_token',
          value: access_token_new.value,
          options: access_token_new.options,
        }),
        setCookie({
          name: 'refresh_token',
          value: refresh_token_new.value,
          options: refresh_token_new.options,
        }),
      ]);
    }
  }
  const { url } = req;

  const isProtected = isProtectedPage(url, PROTECTED_PAGES);
  const isAuth = getToken(access_token);

  if (isProtected && !isAuth) {
    return redirect({ Router, ctx: appContext.ctx, location: '/' });
  }

  return { ...appProps, access_token };
};

export default MyApp;
