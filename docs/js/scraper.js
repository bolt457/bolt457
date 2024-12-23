import axios from 'axios';
import cheerio from 'cheerio';

export async function scrapeData(url) {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const data = [];
    $('.data-class').each((index, element) => {
        data.push($(element).text());
    });
    return data;
}
