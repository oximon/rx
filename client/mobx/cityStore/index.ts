import { makeAutoObservable } from 'mobx';

import { find } from 'lodash-core';

import type { ICityStore } from './cityStore.interface';

class CityStore implements ICityStore {
  cities = [];
  activeCity = { codes: [63], title: 'Самара', titleUrl: 'Samara' };

  constructor() {
    makeAutoObservable(this);
  }

  setCities = (cities): void => {
    this.cities = cities;
  };

  setActiveCity = (city): void => {
    //TODO: пофиксить баг с выбором активного города
    this.activeCity = find(this.cities, (curCity) => (curCity.title = city));
  };
}

export default new CityStore();
