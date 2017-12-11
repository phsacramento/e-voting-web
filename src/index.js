import React 																						from 'react';
import ReactDOM 																				from 'react-dom';
import configureStore 																	from './store/configureStore';
import { Provider } 																		from 'react-redux';
import { Router, browserHistory } 											from 'react-router';
import routes 																					from './routes';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
