/**
 * Created by fiddlest on 3/1/2017.
 */
import loginTypes from '../components/Login/types';
import moment from 'moment';

const initState = {
  hasToken: false,
  isFetching: false,
  tokenReceivedAt: null,
  status: false,
  tokenDetail: {}
};

export default (state = initState, action) => {
  if (action.type === loginTypes.REQUEST_TOKEN) {
    return Object.assign({}, state, {isFetching: true})
  } else if (action.type === loginTypes.TOKEN_RECEIVED) {
    return Object.assign({}, state, {
        isFetching: false,
        hasToken: true,
        status: 'success',
        tokenReceivedAt: moment().get('millisecond'),
        tokenDetail: action.data
      }
    )
  } else if (action.type === loginTypes.REQUEST_TOKEN_FAIL) {
    return Object.assign({}, state, {
      status: 'fail',
      isFetching: false
    })
  }

  return state;


}


