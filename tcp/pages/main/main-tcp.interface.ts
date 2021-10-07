import type { ICatalogItem } from '../../../client/mobx/catalogStore/catalogStore.interface';
import type {
  adsResponse,
  bidResponse,
  catalogWithInfoInterface,
  popularShopInterface,
} from '../../../client/mobx/pages/main/mainStore.interface';
import type { RequestErrorInterface } from '../../../lib/axios/axiosWrapper.interface';

export interface mainPageObjectInterface {
  getCatalog: () => Promise<ICatalogItem[]> | RequestErrorInterface;
  getCatalogWithInfo: () =>
    | Promise<catalogWithInfoInterface[]>
    | RequestErrorInterface;
  getPopularShops: () =>
    | Promise<popularShopInterface[]>
    | RequestErrorInterface;
  getPartners: () => Promise<string[]> | RequestErrorInterface;
  getBids: () => Promise<bidResponse> | RequestErrorInterface;
  getAds: ({
    types,
    limit,
  }: getAdsParams) => Promise<adsResponse> | RequestErrorInterface;
}

export interface getAdsParams {
  types: number;
  limit: number;
}
