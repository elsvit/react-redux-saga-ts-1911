import {connectRouter, routerMiddleware, RouterState} from 'connected-react-router';
import {createBrowserHistory, History} from 'history';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {BASE_URL} from '../constants/config';

import {initApiServices} from '../services/api';
import common, {CommonStateT} from './common';
import countries, {CountriesStateT} from './countries';
import sagas from './sagas';

export interface IAppState {
  countries: CountriesStateT;
  common: CommonStateT;
  router: RouterState;
}

export const api = initApiServices(BASE_URL);

const history = createBrowserHistory() as History;

const reducers = combineReducers<IAppState>({
  countries,
  common,
  router: connectRouter(history),
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagas.forEach((saga: any) => sagaMiddleware.run(saga));

export { store, history };
