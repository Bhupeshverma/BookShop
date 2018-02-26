"use strict"

import {combineReducers} from 'redux';
import {booksReducers} from './bookReducers';
import {cartReducers} from './cartReducers';

export default combineReducers({
  books:booksReducers,
  cart: cartReducers
})
