/**
 * Created by fiddlest on 3/8/2017.
 */

import fetchType from '../types/fetch';

const fetching = () => {
  return {
    type: fetchType.FETCH_DATA
  }
};

const fetchSuccess = (data) => {
  return {
    type: fetchType.FETCH_DATA_SUCCESS,
    data: data
  }
};

const fetchFail = (err) => {
  return {
    type: fetchType.FETCH_DATA_FAILURE,
    error: err
  }
};

const fetchData = (requestUrl, requestData) => {
  return (dispatch) => {
    dispatch(fetching());
    return fetch(requestUrl, requestData)
      .then(response=> response.json())
      .then(data => {
        dispatch(fetchSuccess(data))
      })
      .catch(err=> {
        dispatch(fetchFail(err))
      })
  }
};

const fetchIfNeeded = (requestUrl, requestData)=> {
  return (dispatch, getState) => {
    const {fetchReducer} = getState();
    if (!fetchReducer.isFetching) {
      dispatch(fetchData(requestUrl, requestData))
    }
  }
};

export default fetchIfNeeded



