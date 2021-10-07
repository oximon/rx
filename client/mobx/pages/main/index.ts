import { makeAutoObservable, action } from 'mobx';
import { LoaderStore } from '../../';

import { ADS_TYPE_ENUM } from '../../../../lib/enums/ads.enum';
import { errorHandler, requestWrapper } from '../../../../lib/helpers';
import { mainPageObject } from '../../../../tcp/pages/main';

import type {
  adsInterface,
  adsResponse,
  bidResponse,
  IMainStore,
} from './mainStore.interface';

class MainStore implements IMainStore {
  errorHandler = null;
  popularShops = [];
  catalogWithInfo = [];
  partners = [];
  bids = [];
  ads = {} as {
    rent?: adsInterface[];
    sale?: adsInterface[];
    transportaion?: adsInterface[];
  };

  constructor() {
    makeAutoObservable(this);
    this.errorHandler = errorHandler.bind(this);
  }

  getAds = async (params) => {
    await requestWrapper({
      request: () => mainPageObject.getAds({ ...params }),
      onErrorHandler: action((result: any): void => {
        this.errorHandler(result);
      }),
      onSuccessHandler: action((result: adsResponse): void => {
        const { ads } = result;
        const { types } = params;

        if (types === ADS_TYPE_ENUM.ADS_TYPE_SALE)
          this.ads[ADS_TYPE_ENUM.ADS_TYPE_SALE_TITLE] = ads;
        else if (types === ADS_TYPE_ENUM.ADS_TYPE_TRANSPORTAION)
          this.ads[ADS_TYPE_ENUM.ADS_TYPE_TRANSPORTATION_TITLE] = ads;
      }),
      setLoading: (flag: boolean): void => LoaderStore.setLoading(flag),
    });
  };

  getBids = async () => {
    await requestWrapper({
      request: () => mainPageObject.getBids(),
      onErrorHandler: action((result: any): void => {
        this.errorHandler(result);
      }),
      onSuccessHandler: action((result: bidResponse): void => {
        const { bids } = result;

        this.bids = bids;
      }),
      setLoading: (flag: boolean): void => LoaderStore.setLoading(flag),
    });
  };

  setData = (data): void => {
    const { popularShops, catalogWithInfo, partners, ads } = data;

    this.popularShops = popularShops;
    this.catalogWithInfo = catalogWithInfo;
    this.partners = partners;
    this.ads[ADS_TYPE_ENUM.ADS_TYPE_RENT_TITLE] = ads.ads;
  };
}

export default new MainStore();
