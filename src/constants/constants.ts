import { capitalize } from 'lodash-es';

import { ILabelValue } from '../types/IBaseEntities';
import { RegionName } from '../types/ICountries';

export const DEFAULT_PER_PAGE = 12;

export const REGIONS: ILabelValue<string>[] = Object.keys(RegionName).map(val => ({
  label: capitalize(val),
  value: val.toLowerCase(),
}));
