import express from 'express';
import path from 'path';
import multer from 'multer';
import axios from 'axios';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Chemin vers le répertoire courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware pour gérer les fichiers statiques
app.use(express.static(path.join(__dirname, 'public/public'))); // Serve les fichiers depuis public/public
app.use(express.json());  // Pour parser les requêtes JSON

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/africoinmarket')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.error('Erreur de connexion à MongoDB : ', err));

import Game from './js/GameModel.js';
import Trophy from './js/Trophy.js';

const upload = multer({ dest: 'uploads/' });

// Routes pour servir les pages HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Autres routes pour les pages HTML
app.get('/africoin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'africoin.html')));
app.get('/shop-africoins', (req, res) => res.sendFile(path.join(__dirname, 'public', 'shop-africoins.html')));
app.get('/ads', (req, res) => res.sendFile(path.join(__dirname, 'public', 'ads.html')));
app.get('/betting', (req, res) => res.sendFile(path.join(__dirname, 'public', 'betting.html')));
app.get('/conversion', (req, res) => res.sendFile(path.join(__dirname, 'public', 'conversion.html')));
app.get('/game', (req, res) => res.sendFile(path.join(__dirname, 'public', 'game.html')));
app.get('/stars', (req, res) => res.sendFile(path.join(__dirname, 'public', 'stars.html')));
app.get('/statistics', (req, res) => res.sendFile(path.join(__dirname, 'public', 'statistics.html')));
app.get('/chatbot', (req, res) => res.sendFile(path.join(__dirname, 'public', 'chatbot.html')));
app.get('/investment', (req, res) => res.sendFile(path.join(__dirname, 'public', 'investment.html')));
app.get('/shop', (req, res) => res.sendFile(path.join(__dirname, 'public', 'shop.html')));

// Routes API pour les fonctionnalités backend
app.get('/games-in-testing', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/upload-game', upload.single('game'), async (req, res) => {
    try {
        const game = new Game({
            name: req.body.name,
            creator: req.body.creator,
            path: req.file.path
        });
        await game.save();
        res.json({ message: 'Jeu téléchargé avec succès !' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/trophies', async (req, res) => {
    try {
        const trophies = await Trophy.find();
        if (trophies.length > 0) {
            return res.json(trophies);
        }

        const response = await axios.get('https://example.com/api/trophies'); // Remplacez par l'URL de l'API
        const trophiesFromApi = response.data;
        
        res.json(trophiesFromApi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/upload-trophy', async (req, res) => {
    try {
        const trophy = new Trophy({
            name: req.body.name,
            category: req.body.category,
            odds: req.body.odds,
        });
        await trophy.save();
        res.json({ message: 'Trophée ajouté avec succès !' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/wallet/balance', (req, res) => {
    res.json({ balance: 100 });  // Exemple de réponse JSON
});

app.post('/api/wallet/deposit', (req, res) => {
    res.json({ message: 'Dépôt réussi' });
});

app.post('/api/wallet/withdraw', (req, res) => {
    res.json({ message: 'Retrait réussi' });
});

// Route pour l'authentification Firebase
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        res.json({ message: 'Connecté avec succès', user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Initialisation de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC_AC6Y58nXtGf9DHsRoYnNCh66DBOyZoQ",
    authDomain: "device-streaming-e560d0c6.firebaseapp.com",
    databaseURL: "https://device-streaming-e560d0c6.firebaseio.com",
    projectId: "device-streaming-e560d0c6",
    storageBucket: "device-streaming-e560d0c6.appspot.com",
    messagingSenderId: "253144685018",
    appId: "1:253144685018:android:e5602abec757331c4508e3"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

// Exemple d'écriture dans Firebase Realtime Database
set(ref(database, 'utilisateurs/123'), {
    username: "Jean Dupont",
    email: "jean.dupont@example.com",
    statut: "actif"
});

// Lire des données une fois
get(ref(database, 'utilisateurs/123')).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("Aucune donnée disponible");
    }
});

// Écouter en temps réel les modifications des données
onValue(ref(database, 'utilisateurs'), (snapshot) => {
    console.log(snapshot.val());
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});