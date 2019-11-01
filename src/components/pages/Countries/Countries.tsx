import {push, RouterAction} from 'connected-react-router';
import {isEqual, some, sortBy} from 'lodash-es';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router';
import {bindActionCreators, Dispatch} from 'redux';

import {REGIONS, ROUTES} from '../../../constants';
import {addDensityToCountries} from '../../../services/utils';
import {IAppState} from '../../../store';
import {CountriesActions, getRegionCountriesAction} from '../../../store/countries';
import {SortType} from '../../../types/IBaseEntities';
import {ICountry, ICountryAndDensity} from '../../../types/ICountries';
import CountryInfoModal from '../../modals/CountryInfoModal';

import './countries.scss';
import CountriesView from './CountriesView';

interface IStateMap {
  countries: ICountry[];
  loading: IBoolDict;
}

interface IDispatchMap {
  getRegionCountries: typeof getRegionCountriesAction;
  navTo: (route: string) => RouterAction;
}

type ICountriesProps = IStateMap & IDispatchMap & RouteComponentProps<void & { region: string }>;

interface ICountriesState {
  countries: ICountryAndDensity[];
  sortTitle: string;
  sortActive: SortType;
  modalCountry: Maybe<ICountryAndDensity>;
}

class Countries extends Component<ICountriesProps, ICountriesState> {
  public constructor(props: ICountriesProps) {
    super(props);
    this.state = {
      countries: addDensityToCountries(this.props.countries),
      sortTitle: 'Name',
      sortActive: SortType.ASC,
      modalCountry: null,
    };
  }

  public componentDidMount(): void {
    const { region } = this.props.match.params;
    if (region) {
      if (some(REGIONS, { value: region })) {
        this.props.getRegionCountries(region);
      } else {
        this.props.navTo(ROUTES.REGIONS);
      }
    }
  }

  public componentDidUpdate(prevProps: Readonly<ICountriesProps>): void {
    const { region: prevRegion } = prevProps.match.params;
    const { region } = this.props.match.params;
    if (prevRegion !== region && prevRegion) {
      if (some(REGIONS, { value: region })) {
        this.props.getRegionCountries(region);
      } else {
        this.props.navTo(ROUTES.REGIONS);
      }
    }
    if (!isEqual(prevProps.countries, this.props.countries)) {
      const { sortTitle, sortActive } = this.state;
      const unsortedStateCountries = addDensityToCountries(this.props.countries);
      const countries = this.sortCountries(unsortedStateCountries, sortTitle, sortActive);
      this.setState({ countries });
    }
  }

  public sortCountries = (
    countriesRaw: ICountryAndDensity[],
    sortTitle: string,
    sortActive: SortType,
  ) => {
    const countries = sortBy(countriesRaw, [sortTitle.toLowerCase()]);
    if (sortActive === SortType.DES) {
      countries.reverse();
    }
    return countries;
  };

  public changeSort = (sortTitle: string, sortActive: SortType) => {
    if (this.state.sortTitle !== sortTitle || this.state.sortActive !== sortActive) {
      const countries = this.sortCountries(this.state.countries, sortTitle, sortActive);
      this.setState({
        countries,
        sortTitle,
        sortActive,
      });
    }
  };

  public onCountryClick = (modalCountry: ICountryAndDensity) => {
    this.setState({ modalCountry });
  };

  public onModalClose = () => {
    this.setState({ modalCountry: null });
  };

  public render() {
    const { loading, match } = this.props;
    const { region } = match.params;

    const { sortTitle, sortActive, countries, modalCountry } = this.state;
    const isLoading = !!loading[CountriesActions.GET_REGION_COUNTRIES];
    return (
      <Fragment>
        <CountriesView
          region={region}
          countries={countries}
          sortTitle={sortTitle}
          sortActive={sortActive}
          onClick={this.onCountryClick}
          changeSort={this.changeSort}
          isLoading={isLoading}
        />
        {modalCountry && <CountryInfoModal country={modalCountry} onClose={this.onModalClose} />}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ countries: { countries }, common: { loading } }: IAppState) => ({
  countries,
  loading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getRegionCountries: getRegionCountriesAction,
      navTo: (route: string) => push(route),
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Countries),
);
