// public/js/scripts.js

import axios from 'axios';

// Exemple d'utilisation d'Axios pour récupérer une image ou vidéo depuis une URL
axios.get('URL-de-l-image-ou-video')
  .then(response => {
    // Manipuler le contenu récupéré (par exemple, afficher l'image ou la vidéo)
    const mediaContainer = document.getElementById('media-container');
    const img = document.createElement('img');
    img.src = response.data; // Remplacer par l'URL ou les données de l'image
    mediaContainer.appendChild(img);
  })
  .catch(error => {
    console.error('Erreur lors du téléchargement:', error);
  });
// Fonction pour convertir la cryptomonnaie en AFRICOINS
function convertCryptoToAfricoin(cryptoAmount, cryptoPrice) {
    const africoinValue = 1; // Valeur fixe de 1 AFRICOIN en USD
    const conversionRate = cryptoAmount * cryptoPrice / africoinValue;
    return conversionRate;
}

// Fonction pour effectuer un retrait
function withdrawAfricoin(amount) {
    const userBalance = getUserBalance();
    if (amount < 10000) {
        alert("Le montant minimum pour un retrait est de 10 000 AFRICOINS.");
        return;
    }

    if (amount > userBalance) {
        alert("Solde insuffisant.");
        return;
    }

    const withdrawalFee = amount * 0.02; // 2% de frais
    const amountAfterFee = amount - withdrawalFee;

    // Mettre à jour le solde après retrait
    updateUserBalance(userBalance - amount);
    alert(`Retrait effectué ! Montant après frais (2%): ${amountAfterFee} AFRICOINS`);
}

// Fonction pour récupérer le solde de l'utilisateur (exemple simplifié)
function getUserBalance() {
    return 12000; // Valeur d'exemple, à remplacer par la récupération réelle du solde
}

// Fonction pour mettre à jour le solde de l'utilisateur
function updateUserBalance(newBalance) {
    // Mettez à jour le solde dans la base de données ou localStorage
}
