import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';
import GlobalStyles from './styles/global';

import './config/reactotron';

import { store } from './store';

import history from './services/history';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
        <GlobalStyles />
      </Router>
    </Provider>
  );
}

export default App;
