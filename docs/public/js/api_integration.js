const axios = require('axios');

async function fetchDataFromAPI(endpoint, params) {
    const url = `https://api.example.com/${endpoint}`;
    const headers = {
        'Authorization': 'Bearer YOUR_API_KEY'
    };
    const response = await axios.get(url, { headers, params });
    return response.data;
}

module.exports = { fetchDataFromAPI };
