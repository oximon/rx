import { axiosWrapper } from '../../init';

import type { userObjectInterface } from './user-tcp.interface';

export const userObject: userObjectInterface = {
  getMe: async (token) => {
    return await axiosWrapper.getHTTPRequest('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
