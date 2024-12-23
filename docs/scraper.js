import axios from 'axios';
import { load } from 'cheerio';

export async function scrapeData(url) {
    const response = await axios.get(url);
    const html = response.data;
    const $ = load(html);  // Utiliser load au lieu d'une importation par défaut
    const data = [];
    $('.data-class').each((index, element) => {
        data.push($(element).text());
    });
    return data;
}
