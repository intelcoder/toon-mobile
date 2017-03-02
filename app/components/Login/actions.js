/**
 * Created by fiddlest on 2/27/2017.
 */
import loginTypes from './types';
import secret from '../../config/secret';


export const login = (requestDetail) => {
  return (dispatch, getState) => {
    const state = getState().loginReducer;
    if(!state.isFetching) return dispatch(fetchToken(requestDetail))
  }
};

export const tokenReceived = (tokenInfo) => {
  return {
    type: loginTypes.TOKEN_RECEIVED,
    data: tokenInfo ? tokenInfo : null
  }
};

export const requestToken = () => {
  return {
    type: loginTypes.REQUEST_TOKEN,
  }
};

export const requestFail = (err) => {
  return {
    type: loginTypes.REQUEST_TOKEN_FAIL,
    error: err
  }
};



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

