import * as axios from 'axios';

import type { AxiosWrapperInterface } from './axiosWrapper.interface';

export class AxiosWrapper implements AxiosWrapperInterface {
  readonly instanse: axios.AxiosInstance;

  constructor(baseURL, options = {}) {
    // @ts-ignore
    this.instanse = axios.create({
      baseURL,
      ...options,
    });
  }

  setHeader(header, value) {
    this.instanse.defaults.headers.common[header] = value;
  }

  async getHTTPRequest(url, options = {}) {
    try {
      const res = await this.instanse.get(url, options);
      return res.data;
    } catch (e) {
      if (e.response) {
        const { data } = e.response;
        return data;
      }
      return this.setResponce(500, this.parseResponce(e.message));
    }
  }

  async postHTTPRequest(url, body = {}, options = {}) {
    try {
      const res = await this.instanse.post(url, body, options);
      return res.data;
    } catch (e) {
      if (e.response) {
        const { data } = e.response;
        return data;
      }
      return this.setResponce(500, this.parseResponce(e.message));
    }
  }

  async putHTTPRequest(url, body = {}, options = {}) {
    try {
      const res = await this.instanse.put(url, body, options);
      return res.data;
    } catch (e) {
      if (e.response) {
        const { data } = e.response;
        return data;
      }
      return this.setResponce(500, this.parseResponce(e.message));
    }
  }

  setResponce(code, message) {
    return {
      statusCode: code,
      message,
    };
  }

  parseResponce(message) {
    let result = '';
    switch (message) {
      case 'Network Error':
        result = 'Неизвестная ошибка';
        break;
      default:
        result = 'Неккоректные параметры';
    }
    return result;
  }

  logError(url, message) {
    console.error('Ошибка обращения по адресу:', url, 'Текст ошибки:', message);
  }
}
