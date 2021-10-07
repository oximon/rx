import { AxiosWrapper } from '../lib/axios';

const HOST: string = process.env.NEXT_PUBLIC_API_HOST;
export const axiosWrapper: AxiosWrapper = new AxiosWrapper(
  HOST + '/v1',
  {
    withCredentials: true,
  }
);
