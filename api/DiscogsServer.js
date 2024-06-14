import axios from 'axios';
import { DISCOGS_KEY } from './DiscogsKey';

const DiscogsServer = axios.create(
{
    baseURL: 'https://api.discogs.com/database/search',
});

DiscogsServer.interceptors.request.use(
    async(config) =>
    {
        config.headers.Accept = 'application/json';
        return config;
    },
    (err) =>
    {
        return Promise.reject(err);
    }
);

export const getAlbum = async(callback) =>
{
    const response = await DiscogsServer.get(
        `https://api.discogs.com/database/search?token=${DISCOGS_KEY}&barcode=${callback}&per_page=1&page=1`
    );

    console.log("RESPONSE:" + response);
    const masterID = response.data.results[0].master_id;

    if(!masterID)
    {
        console.log("Could not find master ID");
        return response.data;
    }

    const masterResponse = await DiscogsServer.get(
        `https://api.discogs.com/masters/${masterID}?token=${DISCOGS_KEY}`
    );

    const retVal = 
    {
        artist: masterResponse.data.artists[0],
        title: masterResponse.data.title,
        genre: masterResponse.data.genres,
        styles: masterResponse.data.styles,
        year: masterResponse.data.year,
        trackList: masterResponse.data.tracklist,
        imageURL: masterResponse.data.images[0].uri,
        thumbURL: masterResponse.data.images[0].uri150,
        rating: null,
        condition: '',
    }

    return retVal;
};

export const getAlbumManual = async(artist, title) =>
{
    console.log(artist + '||' + title);
    const response = await DiscogsServer.get(
        `https://api.discogs.com/database/search?token=${DISCOGS_KEY}&release_title=${title}&artist=${artist}&per_page=1&page=1`
    );
    const masterID = response.data.results[0].master_id;

    if(!masterID)
    {
        console.log("Could not find master ID");
        return response.data;
    }

    const masterResponse = await DiscogsServer.get(
        `https://api.discogs.com/masters/${masterID}?token=${DISCOGS_KEY}`
    );

    const retVal = 
    {
        artist: masterResponse.data.artists[0],
        title: masterResponse.data.title,
        genre: masterResponse.data.genres,
        styles: masterResponse.data.styles,
        year: masterResponse.data.year,
        trackList: masterResponse.data.tracklist,
        imageURL: masterResponse.data.images[0].uri,
        thumbURL: masterResponse.data.images[0].uri150,
        rating: null,
        condition: '',
    }

    return retVal;
};

export default DiscogsServer;