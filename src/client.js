"use strict"

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {  Route, BrowserRouter as Router } from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/bookActions';
import routes from './routes'
import BookList from './components/pages/bookList';


import App from './routes';
//STEP-3 define reducer

const middleware = applyMiddleware(thunk,logger);
//STEP-1 create a store
const initialState = window.INITIAL_STATE;
const store = createStore(reducers,initialState, middleware);
const Routes = (
  <Provider store={store}>
    <Router>
      <div>
        <App/>
      </div>
    </Router>
  </Provider>
)

render(
  Routes, document.getElementById('app')
);
