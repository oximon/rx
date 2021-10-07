import { makeAutoObservable } from 'mobx';

import { find } from 'lodash-core';

import type { ICatalogStore, ICatalogItem } from './catalogStore.interface';

class CatalogStore implements ICatalogStore {
  isOpen = false;
  catalog = [];
  activeItem = {} as ICatalogItem;

  constructor() {
    makeAutoObservable(this);
  }

  setOpen = (): void => {
    this.isOpen = !this.isOpen;
  };

  setCatalog = (catalog) => {
    this.catalog = catalog;
    this.activeItem = this.catalog[0];
  };

  setActiveItem = (title) => {
    //TODO: пофиксить баг с выбором активного итема
    this.activeItem = find(this.catalog, (item) => (item.title = title));
  };
}

export default new CatalogStore();
