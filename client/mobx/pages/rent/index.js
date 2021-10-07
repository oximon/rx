import { makeAutoObservable } from 'mobx';

class RentStore {
  cards = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export default new RentStore();
