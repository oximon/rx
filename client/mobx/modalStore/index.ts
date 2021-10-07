import { makeAutoObservable } from 'mobx';
import { indexOf } from 'lodash-core';

import type { IModalStore } from './modalStore.interface';

class ModalStore implements IModalStore {
  modals = [];

  constructor() {
    makeAutoObservable(this);
  }

  openModal(name: string): void {
    this.modals.push(name);
  }

  closeModal(name: string): void {
    const findIndexModal = indexOf(this.modals, name);
    if (findIndexModal !== -1) this.modals.splice(findIndexModal, 1);
  }

  onToggleModalView = (name: string, isOpen: boolean = false) => {
    const func = isOpen ? 'openModal' : 'closeModal';
    return this[func](name);
  };
}

export default new ModalStore();
