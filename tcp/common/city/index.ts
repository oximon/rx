import { axiosWrapper } from '../../init';
import { createQueryString } from '../../../lib/helpers';
import { citiesObjectInterface } from './city-tcp.interface';

export const citiesObject: citiesObjectInterface = {
  getCities: async () => {
    const query: string = createQueryString('cities');

    return await axiosWrapper.getHTTPRequest(query);
  },
};
