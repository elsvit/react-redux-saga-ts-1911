import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {capitalize} from 'lodash-es';
import React from 'react';

import {SortType} from '../../../types/IBaseEntities';
import {ICountryAndDensity} from '../../../types/ICountries';
import HeaderSortName from '../../ui-blocks/HeaderSortName';
import CountryRow from './CountryRow';

interface ICountriesViewProps {
  region: string;
  countries: ICountryAndDensity[];
  sortTitle: string;
  sortActive: SortType;
  onClick: (country: ICountryAndDensity) => void;
  changeSort: (title: string, active: SortType) => void;
  isLoading: boolean;
}

const CountriesView = (props: ICountriesViewProps) => {
  const { region, countries, sortTitle, sortActive, onClick, changeSort, isLoading } = props;
  return (
    <div className="countries-wrapper">
      <div className="page-title">{capitalize(region)}</div>
      <Grid container className="countries-table-header">
        <Grid item xs={12} sm={8} md={6}>
          <HeaderSortName
            title="Name"
            active={sortTitle === 'Name' ? sortActive : SortType.DEFAULT}
            changeSort={changeSort}
          />
        </Grid>
        <Hidden xsDown>
          <Grid item sm={4} md={2}>
            <HeaderSortName
              title="Density"
              active={sortTitle === 'Density' ? sortActive : SortType.DEFAULT}
              changeSort={changeSort}
            />
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid item md={2}>
            <HeaderSortName
              title="Population"
              active={sortTitle === 'Population' ? sortActive : SortType.DEFAULT}
              changeSort={changeSort}
            />
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid item md={2}>
            <HeaderSortName
              title="Area"
              active={sortTitle === 'Area' ? sortActive : SortType.DEFAULT}
              changeSort={changeSort}
            />
          </Grid>
        </Hidden>
      </Grid>
      {isLoading ? (
        <div className="full-size">
          <CircularProgress size={100} className="page-spinner" />
        </div>
      ) : (
        <div className="countries-table">
          {countries.map((country: ICountryAndDensity) => (
            <CountryRow key={country.alpha2Code} country={country} onClick={onClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CountriesView;
