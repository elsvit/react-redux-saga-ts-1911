import { some } from 'lodash-es';
import { push, RouterAction } from 'connected-react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ROUTES, REGIONS } from '../../../constants';
import { IAppState } from '../../../store';
import RegionsView from './RegionsView';

interface IStateMap {}

interface IDispatchMap {
  navTo: (route: string) => RouterAction;
}

type IRegionsProps = IStateMap & IDispatchMap;

class Regions extends Component<IRegionsProps> {
  public onRegionClick = (region: string) => {
    if (some(REGIONS, { value: region })) {
      this.props.navTo(`${ROUTES.COUNTRIES}/${String(region).toLowerCase()}`);
    }
  };

  public render() {
    return <RegionsView regions={REGIONS} onClick={this.onRegionClick} />;
  }
}

const mapStateToProps = (state: IAppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      navTo: (route: string) => push(route),
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Regions);
