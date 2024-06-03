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
    
    return response.data;
};

export default DiscogsServer;