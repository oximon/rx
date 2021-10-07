import type { RefreshTokensInterface } from '../../../client/mobx/userStore/userStore.interface';
import type { RequestErrorInterface } from '../../../lib/axios/axiosWrapper.interface';

export interface authObjectInterface {
  getRefreshToken: (
    token: string,
    options?: any
  ) => Promise<RefreshTokensInterface>;
  logout: (
    token: string
  ) => Promise<{ message: string }> | RequestErrorInterface;
  auth: (
    login: string,
    password: string
  ) =>
    | Promise<{ access_token: string; refresh_token: string }>
    | RequestErrorInterface;
}
