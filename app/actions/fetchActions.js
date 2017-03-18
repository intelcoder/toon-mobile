/**
 * Created by fiddlest on 3/8/2017.
 */

import {fetchTypes} from '../types/fetch';

const fetching = () => {
  return {
    type: fetchTypes.FETCH_DATA
  }
};

const fetchSuccess = (data) => {
  return {
    type: fetchTypes.FETCH_DATA_SUCCESS,
    data: data
  }
};

const fetchFail = (err) => {
  return {
    type: fetchTypes.FETCH_DATA_FAILURE,
    error: err
  }
};

const fetchData = (requestUrl, requestData) => {
  return (dispatch) => {
    dispatch(fetching());
    return fetch(requestUrl, requestData)
      .then(response=> {
        if(response.status == 200) {
          return response.json();
        }
       })
      .then(data => {
        if(data){
          return dispatch(fetchSuccess(data))
        }
        dispatch(fetchFail("error occurred on data fetching"))

      })
      .catch(err=> {
        dispatch(fetchFail(err))
      })
  }
};

export const fetchForInit = (fetchList) => {
  return (dispatch) => {
    dispatch(fetching());
    const promises = fetchList.map((el)=> {
      return fetch(el.requestUrl, el.fetchDetail)
          .then(response=> {
            if (response.status == 200) {
              return response.json();
            }
          })
    });
    Promise.all(promises)
        .then((data)=>{
          return dispatch(fetchSuccess(data))
        })
        .catch((err) => {
          dispatch(fetchFail(err))
        })
  }
};



const fetchIfNeeded = (requestUrl, fetchDetail)=> {
  return (dispatch, getState) => {
    const {fetchReducer} = getState();
    if (!fetchReducer.isFetching) {
      dispatch(fetchData(requestUrl, fetchDetail))
    }
  }
};

export default fetchIfNeeded



