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

export default (props) => {
    //get token from argument

    //send request to get list of webtoons from server

    //once get a list save images into local

    //save data into local storage with path of image

    //when everything is done render webtoonpage with container
}

export const saveImageAndReturnPath = async(site, toon) => {
    let dirs = RNFetchBlob.fs.dirs;
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

export const saveIntoDatabase = (schema, data) => {
    const webtoonModel =  Model(schema);
    webtoonModel.bulkCreate('Webtoon', data);
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
