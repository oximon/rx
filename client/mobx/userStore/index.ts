import { makeAutoObservable, action } from 'mobx';
import { pick } from 'lodash-core';

import { LoaderStore } from '..';

import { requestWrapper, errorHandler, getToken } from '../../../lib/helpers';

import { authObject, userObject } from '../../../tcp/common';

interface IUserStore {
  user: IUser;
  isAuth: boolean;
  token: string;
  error: any;
  result: any;
  errorHandler: () => void;
}

export interface IUser {
  login: string;
  roles: string[];
  limit?: number;
  balance?: number;
  partner?: {
    code: string;
    title?: string;
  };
  isAcceptMDLP: boolean;
  _id?: string;
}

class UserStore implements IUserStore {
  user = {} as IUser;
  isAuth = null;
  token = null;
  error = null;
  result = null;
  errorHandler = null;

  constructor() {
    makeAutoObservable(this);
    this.errorHandler = errorHandler.bind(this);
  }

  async login(login: string, password: string): Promise<void> {
    this.resetStatuses();

    await requestWrapper({
      request: () => authObject.auth(login, password),
      onErrorHandler: action((result: any): void => {
        this.error = result;
        this.logout();
      }),
      onSuccessHandler: async (result: {
        access_token: string;
        refresh_token: string;
      }): Promise<void> => {
        const { access_token } = result;
        console.log(getToken(access_token), 'result');

        // await this.getInfoAboutUser(access_token);
      },
      setLoading: (flag: boolean): void => LoaderStore.setLoading(flag),
    });
  }

  async getRefreshToken(token: string): Promise<void> {
    await requestWrapper({
      request: () => authObject.getRefreshToken(token),
      onErrorHandler: action((): void => {
        this.logout();
        this.error = 'Неккоректные данные для авторизации';
      }),
      onSuccessHandler: async (data: {
        access_token: string;
        refresh_token: string;
      }) => {
        const { access_token } = data;
        await this.getInfoAboutUser(access_token);
      },
      setLoading: (flag: boolean): void => LoaderStore.setLoading(flag),
    });
  }

  async getInfoAboutUser(token: string): Promise<void> {
    await requestWrapper({
      request: () => userObject.getMe(token),
      onErrorHandler: action((): void => {
        this.error = 'Неккоректные данные пользователя';
        this.token = null;
        this.user = {} as IUser;
        this.isAuth = false;
      }),
      onSuccessHandler: action((data: IUser): void => {
        this.user = pick(data, [
          'login',
          'roles',
          'limit',
          'balance',
          'partner',
          'isAcceptMDLP',
        ]);
        this.token = token;
        this.isAuth = !!data;
      }),
      setLoading: (flag: boolean): void => LoaderStore.setLoading(flag),
    });
  }

  setAuth(flag: boolean): void {
    this.isAuth = flag;
  }

  async logout(): Promise<void> {
    await authObject.logout(this.token);
    this.isAuth = false;
  }

  resetStatuses = (): void => {
    this.result = undefined;
    this.error = undefined;
  };
}

export default new UserStore();
