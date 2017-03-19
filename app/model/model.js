/**
 * Created by fiddlest on 3/11/2017.
 */
import {AsyncStorage} from 'react-native';

const keys = {
  LIST: 'list',
  EPISODE: 'episode',
  TOON: 'toon'
};


//key: site - list of webtoon
//key: site:pk - webtoon detail
//key: site:pk:ep - list of episode
//key: site:pk:ep:no - ep detail
//key: site:pk:ep:no:toon
const model = (namespace, table) => {
  const baseKey = namespace.concat('.', table);
  let state = {
    namespace,
    table,
    baseKey,
    separator: ':'
  };
  return {
    save: save(state),
    getById: getById(state),
  }
};

const _setKey = (state, key) => {
  return state.baseKey.concat(state.separator, key);
};

const save = (state) => {
  return async (key, pair) => {
    try {
      const newKey = _setKey(state, key);
      const data = JSON.stringify(pair);
      return await AsyncStorage.setItem(newKey, data);
    } catch(error) {
      return error;
    }
  }
};

const getById = (state) => {
  return async (key) => {
    try {
      const newKey = _setKey(state, key);
      const data =  await AsyncStorage.getItem(newKey);
      return JSON.parse(data);
    } catch(error) {
      return error;
    }
  }
};





export default model;

