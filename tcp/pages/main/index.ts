import { axiosWrapper } from '../../init';
import { createQueryString } from '../../../lib/helpers';

import type { mainPageObjectInterface } from './main-tcp.interface';

export const mainPageObject: mainPageObjectInterface = {
  getCatalog: async () => {
    const query: string = createQueryString('/catalog/v1');

    return await axiosWrapper.getHTTPRequest(query);
  },

  getCatalogWithInfo: async () => {
    const query: string = createQueryString('/catalog/info');

    return await axiosWrapper.getHTTPRequest(query);
  },

  getPopularShops: async () => {
    const query: string = createQueryString('/company/popular');

    return await axiosWrapper.getHTTPRequest(query);
  },

  getPartners: async () => {
    const query: string = createQueryString('/company/partners');

    return await axiosWrapper.getHTTPRequest(query);
  },

  getBids: async () => {
    const query: string = createQueryString('/bids', { limit: 8 });

    return await axiosWrapper.getHTTPRequest(query);
  },

  getAds: async ({ types, limit }) => {
    const query: string = createQueryString('/ads', { types, limit });

    return await axiosWrapper.getHTTPRequest(query);
  },
};
