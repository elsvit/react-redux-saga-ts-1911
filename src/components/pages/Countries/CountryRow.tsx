import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { ICountryAndDensity } from '../../../types/ICountries';

interface ICountryRowProps {
  country: ICountryAndDensity;
  onClick: (country: ICountryAndDensity) => void;
}

const CountryRow = ({ country, onClick }: ICountryRowProps) => {
  return (
    <Grid container className="country-row" onClick={() => onClick(country)}>
      <Grid item xs={12} sm={8} md={6}>
        {country.name}
      </Grid>
      <Hidden xsDown>
        <Grid item sm={4} md={2}>
          <div className="country-row-number">{country.density || ''}</div>
        </Grid>
      </Hidden>
      <Hidden smDown>
        <Grid item md={2}>
          <div className="country-row-number">{country.population || ''}</div>
        </Grid>
      </Hidden>
      <Hidden smDown>
        <Grid item md={2}>
          <div className="country-row-number">{country.area || ''}</div>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default CountryRow;
