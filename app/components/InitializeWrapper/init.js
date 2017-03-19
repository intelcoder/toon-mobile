/**
 * Created by fiddlest on 3/16/2017.
 */

/**
 * requirement
 *  1. This script or process should be able to handle scheduled job.
 *
 */

import RNFetchBlob from 'react-native-fetch-blob'


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
