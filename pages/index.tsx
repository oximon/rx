import dynamic from 'next/dynamic';
import { GetServerSideProps, NextPage } from 'next';
import {
  LoaderStore,
  MainStore,
  CityStore,
  CatalogStore,
} from '../client/mobx';

import { citiesObject } from '../tcp/common/city';
import { mainPageObject } from '../tcp/pages/main';

import { useGeneralHook, usePosition } from '../client/hooks';

import type { mainPageInterface } from './interfaces/mainPage.interface';

const MainContent = dynamic(() => import('../client/components/main/content'));

const Main: NextPage<mainPageInterface> = ({
  cities,
  catalog,
  popularShops,
  catalogWithInfo,
  partners,
  ads,
}) => {
  const { latitude, longitude } = usePosition();

  useGeneralHook({
    page: 'main',
    mainPageData: {
      data: { popularShops, catalogWithInfo, partners, ads },
      setData: (data) => MainStore.setData(data),
    },
    citiesData: {
      cities,
      setCities: (cities) => CityStore.setCities(cities),
    },
    catalogData: {
      catalog,
      setCatalog: (catalog) => CatalogStore.setCatalog(catalog),
    },
    setLoader: (flag) => LoaderStore.setLoading(flag),
  });

  return <MainContent />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const [cities, catalog, popularShops, catalogWithInfo, partners, ads] =
    await Promise.all<any>([
      citiesObject.getCities(),
      mainPageObject.getCatalog(),
      mainPageObject.getPopularShops(),
      mainPageObject.getCatalogWithInfo(),
      mainPageObject.getPartners(),
      mainPageObject.getAds({ types: 2, limit: 8 }),
    ]);

  return {
    props: {
      cities,
      catalog,
      popularShops,
      catalogWithInfo,
      partners,
      ads,
    },
  };
};

export default Main;
