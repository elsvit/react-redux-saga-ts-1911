export enum RegionName {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export type LatLng = [number, number];

export interface ICountry {
  name: string;
  capital: string;
  altSpellings: string[];
  relevance: string;
  region: RegionName;
  subregion: string;
  translations: IStringDict;
  population: number;
  latlng: LatLng;
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  callingCodes: string[];
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  currencies: string[];
  languages: string[];
}

export interface ICountryAndDensity extends ICountry {
  [key: string]: any;
  density: number;
}
