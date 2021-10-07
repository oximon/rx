import type { IUser } from '../../../client/mobx/userStore/userStore.interface';
import type { RequestErrorInterface } from '../../../lib/axios/axiosWrapper.interface';

export interface userObjectInterface {
  getMe: (token: string) => Promise<IUser> | RequestErrorInterface;
}
