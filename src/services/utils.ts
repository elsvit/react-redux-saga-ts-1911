import {ICountry} from '../types/ICountries';

export const addDensityToCountries = (countries: ICountry[]) =>
  countries.map((country: ICountry) => {
    const modifiedCountry = {
      ...country,
      density:
        country.population && country.area
          ? Math.round((country.population / country.area) * 1000) / 1000
          : 0,
    };
    if (!country.area) {
      modifiedCountry.area = 0;
    }
    if (!country.population) {
      modifiedCountry.population = 0;
    }
    return modifiedCountry;
  });
