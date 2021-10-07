import { useEffect, useCallback } from 'react';
import { isBrowser } from '../../lib/helpers';
import { isEmpty } from 'lodash-core';

import type { IUseGeneralHookProps } from './hooks.interface';

export const useGeneralHook = ({
  page,
  mainPageData,
  citiesData,
  catalogData,
  setLoader,
}: IUseGeneralHookProps): void => {
  const setDataInStorage = useCallback(() => {
    if (!isEmpty(citiesData)) {
      const { cities, setCities } = citiesData;
      setCities(cities);
    }

    if (!isEmpty(catalogData)) {
      const { catalog, setCatalog } = catalogData;
      setCatalog(catalog);
    }

    if (!isEmpty(mainPageData)) {
      const { data, setData } = mainPageData;
      const { popularShops, catalogWithInfo, partners, ads } = data;

      setData({ popularShops, catalogWithInfo, partners, ads });
    }

    setLoader(false);
  }, [page, mainPageData]);

  useEffect(() => {
    setDataInStorage();
  }, [setDataInStorage]);

  useEffect(() => {
    isBrowser() && window.scrollTo(0, 0);
  }, []);

  return null;
};
