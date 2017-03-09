/**
 * Created by fiddlest on 3/1/2017.
 */

import {combineReducers} from 'redux';
import fetchReducer from './fetchReducer';
import loginReducer from './loginReducer';


export default combineReducers({
  fetchReducer,
  loginReducer
})
