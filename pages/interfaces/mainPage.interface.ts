import type { ICatalogItem } from '../../client/mobx/catalogStore/catalogStore.interface';
import type { ICityInterface } from '../../client/mobx/cityStore/cityStore.interface';
import type {
  adsResponse,
  catalogWithInfoInterface,
  popularShopInterface,
} from '../../client/mobx/pages/main/mainStore.interface';

export interface mainPageInterface {
  cities: ICityInterface[];
  catalog: ICatalogItem[];
  popularShops: popularShopInterface[];
  catalogWithInfo: catalogWithInfoInterface[];
  partners: string[];
  ads: adsResponse;
}
