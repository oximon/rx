import { makeAutoObservable } from 'mobx';

import type { ILoaderStore } from './loaderStore.interface';

class LoaderStore implements ILoaderStore {
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(state: boolean): void {
    this.isLoading = state;
  }
}

export default new LoaderStore();
