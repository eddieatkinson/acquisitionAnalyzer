import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware } from 'redux';

import RootReducer from './reducers/RootReducer';
import reduxPromise from 'redux-promise';
import { Provider } from 'react-redux';

const theStore = applyMiddleware(reduxPromise)(createStore)(RootReducer);

ReactDOM.render(
	<Provider store={theStore}>
		<App />
	</Provider>,
	document.getElementById('root'));
