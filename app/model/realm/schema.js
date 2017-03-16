/**
 * Created by fiddlest on 3/14/2017.
 */

const ToonImagesSchema = {
    name: 'ToonImages',
    properties: {
        image_url: {type: 'string'},
        order: {type: 'int'}
    }
};


const EpisodeSchema = {
    name: 'Episode',
    properties: {
        episode_title: {type: 'string'},
        no: {type: 'int'},
        uploaded_at: {type: 'string'},
        thumbnail_url: {type: 'string'},
        rating: {type: 'float'},
        toonImage: {type: 'list', objectType: 'ToonImages'}
    }
};

const WebtoonSchema = {
    name: 'Webtoon',
    properties: {
        toon_id: {type: 'string'},
        title: {type: 'string'},
        weekday: {type: 'string'},
        rating: {type: 'float', default: 0},
        description: {type: 'string'},
        author: {type: 'string'},
        thumbnail_url: {type: 'string'},
        lastest_no: {type: 'int', default: 0},
        created_at: {type: 'string'},
        updated_at: {type: 'string'},
        favorite: {type: 'bool'},
        site: {type: 'string'},
        episodes: {type: 'list', objectType: 'Episode'}
    }
};




const SchemaName = {
    WEBTOON: 'Webtoon',
    EPISODE: 'Episode',
    TOONIMAGES: 'ToonImages'
}

export {
    WebtoonSchema,
    EpisodeSchema,
    ToonImagesSchema,
    SchemaName
}
