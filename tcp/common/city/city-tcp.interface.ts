import type { ICityInterface } from '../../../client/mobx/cityStore/cityStore.interface';
import type { RequestErrorInterface } from '../../../lib/axios/axiosWrapper.interface';

export interface citiesObjectInterface {
  getCities: () => Promise<ICityInterface[]> | RequestErrorInterface;
}
