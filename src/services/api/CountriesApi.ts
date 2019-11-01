import BaseApi from './BaseApi';

export default class CountriesApi {
  constructor(baseApi: BaseApi) {
    this.baseApi = baseApi;
  }

  public baseApi: BaseApi;

  public getCountries = () => this.baseApi.get('all', null);

  public getRegionCountries = (region: string) => this.baseApi.get(`region/${region}`, null);
}
