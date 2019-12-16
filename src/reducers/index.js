import { combineReducers } from 'redux';
import board from './board';
import date from './date';

const rootReducer = combineReducers({
  board,
  date,
});
export default rootReducer;