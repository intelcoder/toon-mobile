/**
 * Created by fiddlest on 3/8/2017.
 * @flow
 */
import {urlTypes} from '../model/data';
import secret from '../config/secret';
import queryString from 'query-string';
import moment from 'moment';

export const weekdays = ['mon','tue','wed','thu','fri','sat','sun'];

export const isTokenExpired = (tokenExpireAt, expiresIn) => {
  if(tokenExpireAt){
    return tokenExpireAt > moment().unix() + expiresIn;
  }
  return true;
};



export const indexToweekday = (index) => {
  switch(index){
    case 0: return 'mon';
    case 1: return 'tue';
    case 2: return 'wed';
    case 3: return 'thu';
    case 4: return 'fri';
    case 5: return 'sat';
    case 6: return 'sun';
    default: return 'mon';
  }
};


export const createRequestUrl = (type, site, id = null, episode = null) => {
  const baseUrl = secret.baseUrl + site;
  if(type == urlTypes.LIST){
    return baseUrl;
  }else if(type == urlTypes.EPISODE){
    return baseUrl + `/${id}/episode`
  }else if(type == urlTypes.TOONIMAGE){
    return baseUrl + `${id}/episode/${episode}/toon`
  }
};

export const createUrlQuery = (params) => {
  return queryString.stringify(params);
};

