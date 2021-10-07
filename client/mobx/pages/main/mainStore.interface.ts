import type { getAdsParams } from '../../../../tcp/pages/main/main-tcp.interface';

export interface IMainStore {
  errorHandler: () => void;
  popularShops: popularShopInterface[];
  catalogWithInfo: catalogWithInfoInterface[];
  partners: string[];
  bids: bidInterface[];
  ads: {
    rent?: adsInterface[];
    sale?: adsInterface[];
    transportaion?: adsInterface[];
  };
  getAds: ({ types, limit }: getAdsParams) => void;
  setData: (data: {
    popularShops: { company: popularShopInterface[]; countAll: number };
    catalogWithInfo: catalogWithInfoInterface[];
    partners: string[];
    bids: bidResponse;
    ads: adsResponse;
  }) => void;
}

export interface popularShopInterface {
  city: { title: string };
  countAds: number;
  countViews: number;
  createdAt: string;
  desc: string;
  title: string;
  titleUrl: string;
  _id: string;
  logoUrl?: string;
  adsPhoto?: string[];
}

export interface catalogWithInfoInterface {
  count: number;
  countAdsRent: number;
  countAdsSale: number;
  countBids: number;
  id: number;
  title: string;
  titleUrl: string;
}

export interface bidInterface {
  city: { title: string };
  countViews: number;
  createdAt: string;
  desc: string;
  price: number;
  title: string;
  titleUrl: string;
  type: { title: string };
  _id: string;
}

export interface bidResponse {
  bids: bidInterface[];
  countAll: number;
}

export interface adsInterface {
  city: { title: string };
  company: Pick<
    popularShopInterface,
    'createdAt' | 'logoUrl' | 'title' | 'titleUrl' | '_id'
  > & { email: string };
  condition: { title: string };
  countViews: number;
  createdAt: string;
  desc: string;
  price: number;
  title: string;
  titleUrl: string;
  type: { title: string; id: number };
  year: string;
  _id: string;
  user: { email: string; _id: string };
  photos?: string[];
}

export interface adsResponse {
  countAll: number;
  ads: adsInterface[];
}
