/**
 * Created by fiddlest on 3/4/2017.
 */
import queryString from 'query-string';


const appendQuery = (baseUrl, params) => {
  return baseUrl + '?' + queryString.stringify(params);
};

