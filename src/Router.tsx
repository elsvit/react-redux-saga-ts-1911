/**
 * @fileOverview Routers
 */

import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import RegionsPage from './components/pages/Regions';
import CountriesPage from './components/pages/Countries';
import DrawerWrapper from './components/ui-blocks/DrawerWrapper';

import { ROUTES } from './constants';

interface IOwnProps extends RouteProps {
  history: History;
}

type IRouterProps = IOwnProps;

class Router extends React.Component<IRouterProps> {
  public render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <DrawerWrapper>
          <Switch>
            <Route exact path={ROUTES.REGIONS} component={RegionsPage} />
            <Route exact path={`${ROUTES.COUNTRIES}/:region`} component={CountriesPage} />
            <Redirect to={ROUTES.REGIONS} />
          </Switch>
        </DrawerWrapper>
      </ConnectedRouter>
    );
  }
}

export default Router;
