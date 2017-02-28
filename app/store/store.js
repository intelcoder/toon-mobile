/**
 * Created by fiddlest on 2/24/2017.
 */
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { requestReducer } from '../reducers/requestReducer';

const middlewares = [thunkMiddleware];


if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middlewares.push(logger);
}

const store = createStore(
    ...requestReducer,
  applyMiddleware(...middlewares)
);


export default store;
