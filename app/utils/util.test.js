/**
 *
 * Created by fiddlest on 3/16/2017.
 */
import moment from 'moment';

import {isTokenExpired} from './index';

test("test token expire function",()=>{
    const cur = moment().unix();
    expect(isTokenExpired(cur, -100)).toBeTruthy();
    expect(isTokenExpired(cur, 20000)).toBeFalsy();
    expect(isTokenExpired(cur, 100)).toBeFalsy();
});