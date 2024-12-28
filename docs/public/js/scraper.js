// scraper.js

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function scrapeMedia(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        let mediaUrls = [];

        // Scraper les images
        $('img').each((i, elem) => {
            const imgUrl = $(elem).attr('src');
            if (imgUrl) {
                mediaUrls.push(imgUrl);
            }
        });

        // Scraper les vidéos
        $('video source').each((i, elem) => {
            const videoUrl = $(elem).attr('src');
            if (videoUrl) {
                mediaUrls.push(videoUrl);
            }
        });

        return mediaUrls;
    } catch (error) {
        console.error("Erreur lors du scraping:", error);
        return [];
    }
}

// Exemple d'utilisation
const url = 'URL_DE_LA_PAGE_A_SCRAPER';
scrapeMedia(url).then((mediaUrls) => {
    console.log("Médias trouvés:", mediaUrls);
});
