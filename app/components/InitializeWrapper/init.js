/**
 * Created by fiddlest on 3/16/2017.
 */

/**
 * requirement
 *  1. This script or process should be able to handle scheduled job.
 *
 */

import RNFetchBlob from 'react-native-fetch-blob'
import Model from '../../model/realm/model';

export const saveImageToLocal = () => {
  const dirs = RNFetchBlob.fs.dirs;
  return (webtoon) => {
    return RNFetchBlob
      .config({
        path: dirs.DocumentDir + `/${webtoon.site}/${webtoon.toon_id}.jpg`,
        appendExt: 'jpg',
      })
      .fetch('GET', webtoon.thumbnail_url, {})
      .then((res) => {
        webtoon.thumbnail_url = res.path();
        return webtoon;
      });
  };
};

export const saveImageAndReturnPath = async(site, toon) => {
    const  dirs = RNFetchBlob.fs.dirs;
    return await RNFetchBlob
        .config({
            path: dirs.DocumentDir + `/${site.toLowerCase()}/${toon.toon_id}.jpg`,
            appendExt: 'jpg',
        })
        .fetch('GET', toon.thumbnail_url, {})
        .then((res) => {
            return res.path();
        });
};

export const saveIntoDatabase = (schema, SchemaName, data) => {
    const webtoonModel = Model(schema);
    webtoonModel.bulkCreate(SchemaName, data);
};
/*

const tmp = async()=> {
    let dirs = RNFetchBlob.fs.dirs;
    const result = toonList.map((toon) => {
        return RNFetchBlob
            .config({
                path: dirs.DocumentDir + '/naver/' + toon.toon_id + '.jpg',
                appendExt: 'jpg',
            })
            .fetch('GET', toon.thumbnail_url, {})
            .then((res) => {
                toon.thumbnail_url = res.path();
                return toon;
            })
    });
    Promise.all(result)
        .then((re)=> {
            console.log("done", JSON.stringify(re))
        })
};
*/
