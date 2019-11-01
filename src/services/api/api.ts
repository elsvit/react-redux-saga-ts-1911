import BaseApi from './BaseApi';
import CountriesApi from './CountriesApi';

export interface IApiServices {
  baseApi: BaseApi,
  countriesApi: CountriesApi,
}

export function initApiServices(baseUrl?: string): IApiServices {
  const baseApi = new BaseApi(baseUrl);
  const countriesApi = new CountriesApi(baseApi);

  return {
    baseApi,
    countriesApi,
  };
}
