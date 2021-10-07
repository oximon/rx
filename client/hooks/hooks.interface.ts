import type { ICatalogItem } from '../mobx/catalogStore/catalogStore.interface';
import type { ICityInterface } from '../mobx/cityStore/cityStore.interface';
import type {
  adsResponse,
  catalogWithInfoInterface,
  popularShopInterface,
} from '../mobx/pages/main/mainStore.interface';

export interface useQueryHookProps {
  pageTitle: string;
  data: {
    search?: string;
    page?: number;
    limit?: number;
    arrSort?: Array<{ title: string; value: string }>;
    startDate?: string;
    endDate?: string;
    sumFrom?: number;
    sumTo?: number;
    statuses?: Array<{ title: string; value: string }>;
    sort?: string;
    isAuth?: boolean;
  };
}

export interface initialParamsInterface {
  params: {
    countPages: number[];
    checkIfListExist: boolean;
    defaultSortValue: string;
    onPaginationClick?: (page: number) => void;
    onChangeLimit?: (limit: number) => void;
    onChangeSort?: (sort: string) => void;
  };
  queries?: Array<{ dependencies: string[]; query: () => void }>;
}

export interface errorObjectInterface {
  required?: string;
  minLength?: string;
  patternText?: string;
  incorrectEmail?: string;
}

export interface inputInterface {
  inputName: string;
  inputValue: string;
  options: string[];
}

export interface IUseGeneralHookProps {
  page: string;
  mainPageData?: {
    data: {
      popularShops: popularShopInterface[];
      catalogWithInfo: catalogWithInfoInterface[];
      partners: string[];
      ads: adsResponse;
    };
    setData: (data) => void;
  };
  citiesData?: {
    cities: ICityInterface[];
    setCities: (cities) => void;
  };
  catalogData?: {
    catalog: ICatalogItem[];
    setCatalog: (data) => void;
  };
  setLoader: (flag: boolean) => void;
}

export interface IUsePositionSettings {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}

export interface IUsePositionOutput {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  timestamp: number;
}
