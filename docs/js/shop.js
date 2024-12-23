function convertToAfricoin() {
    const usdAmount = document.getElementById('usd-amount').value;
    const btcAmount = document.getElementById('btc-amount').value;

    if (usdAmount) {
        document.getElementById('africoin-from-usd').textContent = usdAmount * 100;
    }

    if (btcAmount) {
        document.getElementById('africoin-from-btc').textContent = btcAmount * 5000;
    }
}

function purchaseAfricoin() {
    alert('Achat effectué avec succès');
}

// shop.js

// Variables globales pour suivre les montants des devises
let usdAmount = 0;
let btcAmount = 0;

// Fonction pour convertir les devises en AFRICOINS
function convertToAfricoin() {
    const usdValue = document.getElementById('usd-amount').value;
    const btcValue = document.getElementById('btc-amount').value;

    // Conversion de l'USD en AFRICOINS
    if (usdValue > 0) {
        usdAmount = usdValue;
        document.getElementById('africoin-from-usd').innerText = (usdAmount * 100).toFixed(2);
    } else {
        document.getElementById('africoin-from-usd').innerText = 0;
    }

    // Conversion du Bitcoin en AFRICOINS
    if (btcValue > 0) {
        btcAmount = btcValue;
        document.getElementById('africoin-from-btc').innerText = (btcAmount * 5000).toFixed(2);
    } else {
        document.getElementById('africoin-from-btc').innerText = 0;
    }
}

// Fonction pour initier l'achat des AFRICOINS
function purchaseAfricoin() {
    const totalAfricoin = (usdAmount * 100) + (btcAmount * 5000);

    if (totalAfricoin <= 0) {
        alert("Veuillez entrer un montant valide.");
        return;
    }

    // Afficher la confirmation d'achat avec les détails
    const purchaseDetails = `Vous achetez ${totalAfricoin.toFixed(2)} AFRICOINS.`;
    document.getElementById('purchase-details').innerText = purchaseDetails;
    document.getElementById('purchase-confirmation').style.display = 'block';
}

// Fonction pour confirmer l'achat
function confirmPurchase() {
    // Implémenter la logique pour effectuer l'achat (par exemple, transaction, mise à jour du solde)
    alert("Achat confirmé ! Vos AFRICOINS ont été ajoutés à votre compte.");
    // Réinitialiser les champs après l'achat
    document.getElementById('usd-amount').value = '';
    document.getElementById('btc-amount').value = '';
    document.getElementById('africoin-from-usd').innerText = 0;
    document.getElementById('africoin-from-btc').innerText = 0;
    document.getElementById('purchase-confirmation').style.display = 'none';
}

// Fonction pour annuler l'achat
function cancelPurchase() {
    document.getElementById('purchase-confirmation').style.display = 'none';
}
