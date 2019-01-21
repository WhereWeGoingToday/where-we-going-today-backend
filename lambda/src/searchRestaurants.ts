import fetch from 'node-fetch';
import { URL, URLSearchParams } from 'url';

const searchBusinessEndpoint = 'https://api.yelp.com/v3/businesses/search';
const yelpApiKey = process.env['YELP_API_KEY'];

let handler = async () => {
    let params = {location: 'Seattle', term: 'Chinese'};
    let searchBusinessUrl = new URL(searchBusinessEndpoint);
    searchBusinessUrl.search = new URLSearchParams(params).toString();
    let response = await fetch(searchBusinessUrl.toString(), {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${yelpApiKey}`,
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
};

module.exports = { handler };