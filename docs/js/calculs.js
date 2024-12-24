// calculs.js

const axios = require('axios');

function calculerPopularite(followers, engagement) {
    return Math.log(followers) * engagement;
}

async function recupererDonneesReseauSocial(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return null;
    }
}

function calculerCoteStar(followers, engagement, ventes, recompenses) {
    const popularite = calculerPopularite(followers, engagement);
    return (popularite * ventes) / (recompenses + 1);
}

// Exemple d'utilisation
const followers = 50000;
const engagement = 0.05;
const ventes = 10000;
const recompenses = 3;

const cote = calculerCoteStar(followers, engagement, ventes, recompenses);
console.log(`La cote de la star est : ${cote}`);
