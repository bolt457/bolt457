// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

javascript
Copier le code
// server.js (ou app.js)

const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Configuration de Multer pour enregistrer les fichiers téléchargés dans le dossier 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Définir le dossier de destination pour les fichiers uploadés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier avec la date actuelle
  }
});

const upload = multer({ storage: storage });

// Route pour l'upload d'image
app.post('/upload-image', upload.single('image'), (req, res) => {
  // Traitement de l'image téléchargée
  console.log(req.file); // Afficher les informations du fichier téléchargé
  res.send('Image téléchargée avec succès!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
Installation des dépendances :
Avant de pouvoir utiliser Multer et Express, vous devez installer ces dépendances. Depuis le répertoire racine de votre projet (où se trouve votre package.json), exécutez les commandes suivantes dans votre terminal :

bash
Copier le code
npm init -y  # Si vous n'avez pas encore initialisé votre projet Node.js
npm install express multer
Structure du projet :
Voici un exemple de structure de votre projet pour organiser le frontend et le backend :

java
Copier le code
/project-root
    /public
        /js
            scripts.js  // Le fichier JavaScript pour le frontend
        index.html     // Votre fichier HTML pour le frontend
    /server
        server.js      // Le fichier Node.js pour le backend
    /uploads           // Dossier où les fichiers téléchargés seront stockés
    package.json       // Dépendances Node.js
Conclusion
Frontend (Client-side) : Le code Axios doit être dans un fichier JavaScript lié à votre page HTML (par exemple public/js/scripts.js).
Backend (Server-side) : Le code Multer doit être dans un fichier serveur Node.js (par exemple server.js), où vous gérez les routes pour l'upload de fichiers.
Assurez-vous que votre serveur Node.js est bien configuré pour gérer les requêtes HTTP et l'upload de fichiers, et que vous utilisez le frontend pour interagir avec ce serveur.


{
  "name": "africoin-beta",
  "scripts": {},
  "env": {
    "NODE_ENV": "production"
  },
  "formation": {
    "web": {
      "quantity": 1,
      "size": "free"
    }
  },
  "addons": []
}
document.getElementById('investmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const companyName = document.getElementById('companyName').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Calculer le potentiel de gain (par exemple, 20% de gain potentiel)
    const potentialGain = amount + (amount * 0.2);

    // Ajouter les données au tableau boursier
    const tableBody = document.querySelector('#stockTable tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${companyName}</td>
        <td>${amount.toFixed(2)} Africoins</td>
        <td>${potentialGain.toFixed(2)} Africoins</td>
    `;
    tableBody.appendChild(newRow);

    // Réinitialiser le formulaire
    document.getElementById('investmentForm').reset();
});






