/**
 * Created by fiddlest on 3/11/2017.
 */
import {AsyncStorage} from 'react-native';

const keys = {
  LIST: 'list',
  EPISODE: 'episode',
  TOON: 'toon'
};


//key: site - list of webtoon id
//key: site:pk - webtoon detail of webtoon
//key: site:pk:ep - list of episode
//key: site:pk:ep:no - ep detail
//key: site:pk:ep:no:toon
const model = () => {
  let state = {

  };
  return {
    save: save(state),
    getByKey: getByKey(state),
  }
};


const save = (state) => {
  return async (key, data) => {
    try {
      const jsonData = JSON.stringify(data);
      return AsyncStorage.setItem(key, jsonData);
    } catch(error) {
      return error;
    }
  }
};

const getByKey = (state) => {
  return async (key) => {
    try {
      const data =  await AsyncStorage.getItem(key);
      return JSON.parse(data);
    } catch(error) {
      return error;
    }
  }
};


const isExist = async (key) => {
  const result = await AsyncStorage.getItem(key);
  return result !== null;
};




export default model;

