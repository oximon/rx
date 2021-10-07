import { axiosWrapper } from '../../init';

import type { authObjectInterface } from './auth-tcp.interface';

export const authObject: authObjectInterface = {
  getRefreshToken: async (token, options = {}) => {
    return await axiosWrapper.postHTTPRequest(
      '/auth/refresh-tokens',
      {
        value: token,
      },
      options
    );
  },
  logout: async (token) => {
    return await axiosWrapper.getHTTPRequest('/auth/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  auth: async (login, password) => {
    return await axiosWrapper.postHTTPRequest('/auth/login', {
      login,
      password,
    });
  },
};
