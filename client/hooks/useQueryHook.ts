/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo } from 'react';
import { FilterStore, UserStore, LoaderStore } from '../mobx';
import { useRouter } from 'next/router';

import { newArray, checkLengthArr } from '../../lib/helpers';

import type {
  initialParamsInterface,
  useQueryHookProps,
} from './hooks.interface';

export const useQueryHook = ({ pageTitle, data }: useQueryHookProps) => {
  const { push, pathname, query } = useRouter();

  const { setFilterValues, isSendQuery, filterValuesObject, setIsSendQuery } =
    FilterStore;
  const { main, profile, basket, defaultValues } = filterValuesObject;
  const { isAuth } = UserStore;

  const {
    search,
    page,
    limit,
    arrSort,
    startDate,
    endDate,
    sumFrom,
    sumTo,
    statuses,
  } = data;

  const initialParams = useMemo((): initialParamsInterface => {
    let object: initialParamsInterface = {} as initialParamsInterface;

    const countPages = (count: number): number[] =>
      limit ? newArray(Math.ceil(count / limit)) : newArray(0);

    const checkIfListExist = (list: Array<any>): boolean =>
      checkLengthArr(list);

    const defaultSortValue = (sort: string): string =>
      arrSort.filter((item) => item.value === sort)[0]?.title;

    if (pageTitle === 'main') {
      object = {
        params: {
          countPages: countPages(123),
          checkIfListExist: checkIfListExist([1, 2, 3]),
          defaultSortValue: defaultSortValue(main.sort),
          onPaginationClick: (page: number) => {
            LoaderStore.setLoading(true);
            setFilterValues(
              {
                page,
              },
              'main'
            );

            setIsSendQuery(true);

            push({
              pathname,
              query: {
                ...query,
                page,
              },
            });
          },
          onChangeLimit: (limit: number) => {
            LoaderStore.setLoading(true);
            setFilterValues(
              {
                limit,
                page: 1,
              },
              'main'
            );

            setIsSendQuery(true);

            push({
              pathname,
              query: {
                ...query,
                page: 1,
                limit,
              },
            });
          },
          onChangeSort: (value: string) => {
            LoaderStore.setLoading(true);
            setFilterValues(
              {
                sort: value,
                page: 1,
              },
              'main'
            );

            setIsSendQuery(true);

            push({
              pathname,
              query: {
                ...query,
                page: 1,
                sort: value,
              },
            });
          },
        },
      };
    }

    return object;
  }, [
    search,
    isSendQuery,
    page,
    limit,
    main.sort,
    arrSort,
    pageTitle,
    data,
    isAuth,
  ]);

  const { params, queries } = initialParams;

  queries?.forEach(({ query, dependencies }) => {
    useEffect(() => {
      query();
    }, dependencies);
  });

  return { ...params };
};
