import express from 'express';
import { scrapeData } from './scraper.js';
import { fetchDataFromAPI } from './api_integration.js';
import Queue from 'bull';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

const app = express();
const PORT = process.env.PORT || 3001;

const updateOddsQueue = new Queue('update-odds', 'redis://127.0.0.1:6379');

app.use(express.json());

app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Bienvenue sur l\'API!' });
});

app.get('/api/scrape', async (req, res) => {
    const url = req.query.url;
    const data = await scrapeData(url);
    res.status(200).json(data);
});

app.get('/api/data', async (req, res) => {
    const endpoint = req.query.endpoint;
    const params = req.query.params;
    const data = await fetchDataFromAPI(endpoint, params);
    res.status(200).json(data);
});

app.post('/api/update_odds', (req, res) => {
    updateOddsQueue.add();  
    res.status(200).json({ message: 'Mise à jour des cotes lancée.' });
});

updateOddsQueue.process(async (job) => {
    console.log('Mise à jour des cotes en cours...');
    // Ajoutez ici votre logique de mise à jour des cotes
    return { message: 'Cotes mises à jour' };
});

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
