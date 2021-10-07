import { makeAutoObservable } from 'mobx';
import _ from 'lodash-core';
import { rentArrSort } from '../../../lib/constants/filters.constants';

const defaultFields = ['page', 'limit', 'search', 'sliceIndex'];

class FilterStore {
  isSendQuery = false;

  filterValuesObject = {
    defaultValues: {
      page: 1,
      limit: 10,
    },
    rent: {
      sort: rentArrSort[0].value,
      categories: [
        {
          title: 'Бетонное оборудование',
          checked: false,
        },
        {
          title: 'Грузовики, кузова',
          checked: false,
        },
        {
          title: 'Дородная техника',
          checked: false,
        },
        {
          title: 'Землеройная техника',
          checked: false,
        },
        {
          title: 'Карьерная техника',
          checked: false,
        },
        {
          title: 'Коммунальная техника',
          checked: false,
        },
        {
          title: 'Лесная техника',
          checked: false,
        },
        {
          title: 'Мини-техника',
          checked: false,
        },
        {
          title: 'Пассажирский транспорт',
          checked: false,
        },
        {
          title: 'Подъемная техника',
          checked: false,
        },
      ],

      brand: [
        {
          title: 'FORD',
          count: 109,
          checked: false,
        },
        {
          title: 'IVECO',
          count: 59,
          checked: false,
        },
        {
          title: 'MERCEDES-BENZ',
          count: 44,
          checked: false,
        },
        {
          title: 'RENAULT',
          count: 28,
          checked: false,
        },
        {
          title: 'TOYOTA',
          count: 27,
          checked: false,
        },
        {
          title: 'SCANIA',
          count: 11,
          checked: false,
        },
        {
          title: 'УАЗ',
          count: 5,
          checked: false,
        },
      ],
      model: [
        {
          title: 'Transit шасси',
          checked: false,
        },
        {
          title: 'Transit Custom фургон',
          checked: false,
        },
        {
          title: 'Transit фургон',
          checked: false,
        },
        {
          title: 'Transit микроавтобус',
          checked: false,
        },
      ],
      rentLocation: [
        {
          title: 'Вся Россия',
          checked: false,
        },
        {
          title: 'Саратов',
          checked: false,
        },
        {
          title: 'Санкт-Петербург',
          checked: false,
        },
        {
          title: 'Москва',
          checked: false,
        },
      ],
      rentState: 'Все',
      priceFrom: '',
      priceTo: '',
      yearFrom: '',
      yearTo: '',
    },
  };

  constructor() {
    makeAutoObservable(this);
  }

  setFilterValues = (obj, page) => {
    this.filterValuesObject = {
      ...this.filterValuesObject,
      defaultValues: {
        ...this.filterValuesObject['defaultValues'],
        ..._.pick(obj, defaultFields),
      },
      [page]: {
        ...this.filterValuesObject[page],
        ..._.omit(obj, defaultFields),
      },
    };
  };

  resetFilterValuesObject = () => {
    this.filterValuesObject = {
      defaultValues: {
        page: 1,
        limit: 10,
      },
      rent: {
        sort: rentArrSort[0].value,
      },
    };
  };

  setIsSendQuery = (flag) => {
    this.isSendQuery = flag;
  };
}

export default new FilterStore();
