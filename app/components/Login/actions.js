/**
 * Created by fiddlest on 2/27/2017.
 */
import loginTypes from './types';

export const login = (loginInfo) => {
  console.log('action login', loginInfo);
  return {
    type: loginTypes.REQUEST_TOKEN,
    loginInfo: loginInfo
  }
};
