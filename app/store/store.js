/**
 * Created by fiddlest on 2/24/2017.
 */
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers/index';

const middlewares = [thunkMiddleware];


if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middlewares.push(logger);
}

const store = createStore(
  reducers,
  applyMiddleware(...middlewares)
);


export default store;
