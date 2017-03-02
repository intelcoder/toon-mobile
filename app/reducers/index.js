/**
 * Created by fiddlest on 3/1/2017.
 */

import {combineReducers} from 'redux';
import requestReducer from './requestReducer';
import loginReducer from './loginReducer';


export default combineReducers({
  requestReducer,
  loginReducer
})
