// stars.js (Backend)
import express from 'express';
import { scrapeData } from './scraper.js';
import { fetchDataFromAPI } from './api_integration.js';
import Queue from 'bull';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Servir les fichiers statiques depuis le dossier 'public'

// Route pour télécharger une vidéo
app.post('/upload-video', (req, res) => {
    // Logique pour gérer l'upload de vidéo
    res.send('Vidéo téléchargée avec succès !');
});

// Route pour scraper des données
app.get('/scrape', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL est requise');
    }
    try {
        const data = await scrapeData(url);
        res.json(data);
    } catch (error) {
        res.status(500).send('Erreur lors du scraping de données');
    }
});

// Route pour récupérer des données depuis une API
app.get('/fetch-data', async (req, res) => {
    const endpoint = req.query.endpoint;
    const params = req.query.params;
    if (!endpoint) {
        return res.status(400).send('Endpoint est requis');
    }
    try {
        const data = await fetchDataFromAPI(endpoint, params);
        res.json(data);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
