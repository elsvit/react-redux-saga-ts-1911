/**
 * @fileOverview Root App component
 */

import React from 'react';
import {Provider} from 'react-redux';

import {history, store} from './store';
import Router from './Router';

import './app.scss';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <Router history={history}/>
    </div>
  </Provider>
);

export default App;
