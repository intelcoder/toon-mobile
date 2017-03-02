/**
 * Created by fiddlest on 2/27/2017.
 */
import loginTypes from './types';
import secret from '../../config/secret';

/**
 * This action will check if user already requested token
 * If not it calls fetchToken function to  get token
 * @param requestDetail Fetch detail
 * @returns {function(*, *)}
 */
export const login = (requestDetail) => {
  return (dispatch, getState) => {
    const state = getState().loginReducer;
    if(!state.isFetching) return dispatch(fetchToken(requestDetail))
  }
};

/**
 * This action will be fired when token successfully received
 * @param tokenInfo
 * @returns {{type: string, data: null}}
 */
export const tokenReceived = (tokenInfo) => {
  return {
    type: loginTypes.TOKEN_RECEIVED,
    data: tokenInfo ? tokenInfo : null
  }
};


/**
 * This function updates isFetching to true
 * @returns {{type: string}}
 */
export const requestToken = () => {
  return {
    type: loginTypes.REQUEST_TOKEN,
  }
};

/**
 * This action will be fired on request fail
 * @param err error msg from request
 * @returns {{type: string, error: *}}
 */
export const requestFail = (err) => {
  return {
    type: loginTypes.REQUEST_TOKEN_FAIL,
    error: err
  }
};

/**
 * This function calls requestToken, tokenReceived, and requestFail on different condition
 * @param requestDetail Fetch request detail( methods, headers, body }
 * @returns {function(*)}
 */
const fetchToken = (requestDetail) => {
  return (dispatch ) => {
    dispatch(requestToken());
    return fetch(secret.tokenUrl, requestDetail)
      .then(response => response.json())
      .then(json => dispatch(tokenReceived(json)))
      .catch(err => {
        dispatch(requestFail(err));
      })
  }
};

