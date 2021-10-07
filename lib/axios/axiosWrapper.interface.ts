import * as axios from 'axios';

export interface AxiosWrapperInterface {
  readonly instanse: axios.AxiosInstance;
  setHeader: (header: string, value: string) => void;
  getHTTPRequest: (url: string, options?: any) => Promise<any>;
  postHTTPRequest: (url: string, body: any, options?: any) => Promise<any>;
  putHTTPRequest: (url: string, body: any, options?: any) => Promise<any>;
  setResponce: (code: number, message: string) => IResponce;
  parseResponce: (message: string) => string;
  logError: (url: string, message: string) => void;
}

export interface RequestErrorInterface {
  error?: string;
  message: string;
  statusCode: number;
}

export interface IResponce {
  statusCode: number;
  message: any;
}
