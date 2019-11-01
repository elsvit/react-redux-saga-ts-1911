import { stringify } from 'query-string';

import { API_PATH } from '../../constants/config';

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface IFetchResult {
  url: string;
  method: ApiMethod;
  value?: any;
  headers?: any;
}

interface IFetchOptions {
  method: ApiMethod;
  credentials?: string;
  headers?: IStringDict;
  body?: string | FormData;
}

export default class BaseApi {
  public baseApiURL: string;

  constructor(baseURL: string = '') {
    this.baseApiURL = `${baseURL}${API_PATH}`;
  }

  private request = (url: string, options: any) =>
    new Promise((resolve, reject) =>
      fetch(url, options)
        .then(res => res.json())
        .then(res => {
          if (res) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          console.error(err);
          reject({
            success: false,
            error: err,
          });
        }),
    );

  public handleFetch = ({ url, method, value = null, headers = null }: IFetchResult) => {
    let queryPath = `${this.baseApiURL}${url}`;
    const options: IFetchOptions = {
      method,
    };
    if (value != null) {
      if (method === ApiMethod.GET) {
        queryPath += `?${stringify(value)}`;
      } else {
        options.body = JSON.stringify(value);
      }
    }

    return this.request(queryPath, options);
  };

  public get = (url: string, value?: any) =>
    this.handleFetch({ url, method: ApiMethod.GET, value });
}
