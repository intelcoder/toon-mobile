/**
 * Created by fiddlest on 3/16/2017.
 */

/**
 * requirement
 *  1. This script or process should be able to handle scheduled job.
 *
 */

import RNFetchBlob from 'react-native-fetch-blob'

const dirs = RNFetchBlob.fs.dirs;

export const saveImageToLocal = () => {
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


export const saveToonImagesToLocal = (toonImageObj, toondId, episodeNo) => {
  return RNFetchBlob
    .config({
      path: dirs.DocumentDir + `/${toondId}/${episodeNo}/${toonImageObj.order}.jpg`,
      appendExt: 'jpg'
    })
    .fetch('GET', toonImageObj.image_url, {})
    .then((res)=>{
      toonImageObj.image_url = res.path();
      return toonImageObj;
    })
};