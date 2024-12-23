// africoin.js

// Initialise le nombre total d'Africoins en circulation
let totalAfricoins = 0;

// Références aux éléments HTML
const emissionForm = document.getElementById('emissionForm');
const emissionResult = document.getElementById('emissionResult');
const totalAfricoinsDisplay = document.getElementById('totalAfricoins');

// Met à jour l'affichage des Africoins totaux
function updateTotalAfricoinsDisplay() {
    totalAfricoinsDisplay.textContent = totalAfricoins;
}

// Gestion de l'émission des Africoins
emissionForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Récupère le montant à émettre
    const amount = parseInt(document.getElementById('amount').value, 10);

    if (isNaN(amount) || amount <= 0) {
        emissionResult.textContent = "Veuillez entrer un montant valide.";
        emissionResult.style.color = "red";
        return;
    }

    // Mise à jour du total des Africoins
    totalAfricoins += amount;
    updateTotalAfricoinsDisplay();

    // Affiche un message de succès
    emissionResult.textContent = `${amount} Africoins ont été émis avec succès !`;
    emissionResult.style.color = "green";

    // Réinitialise le formulaire
    emissionForm.reset();
});

// Initialisation à l'ouverture de la page
updateTotalAfricoinsDisplay();
const walletBalance = document.getElementById('wallet-balance');
const depositForm = document.getElementById('deposit-form');
const withdrawForm = document.getElementById('withdraw-form');
const depositMessage = document.getElementById('deposit-message');
const withdrawMessage = document.getElementById('withdraw-message');

// Fonction pour récupérer le solde
function updateWalletBalance() {
    fetch('/api/wallet/balance') // API backend pour obtenir le solde
        .then(response => response.json())
        .then(data => {
            walletBalance.textContent = data.balance || 0;
        })
        .catch(error => console.error('Erreur:', error));
}

// Gestion du dépôt
depositForm.addEventListener('submit', event => {
    event.preventDefault();
    const amount = parseInt(document.getElementById('deposit-amount').value, 10);

    fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
    })
    .then(response => response.json())
    .then(data => {
        depositMessage.textContent = data.message;
        depositMessage.style.color = data.success ? 'green' : 'red';
        updateWalletBalance();
    })
    .catch(error => console.error('Erreur:', error));
});

// Gestion du retrait
withdrawForm.addEventListener('submit', event => {
    event.preventDefault();
    const amount = parseInt(document.getElementById('withdraw-amount').value, 10);

    fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
    })
    .then(response => response.json())
    .then(data => {
        withdrawMessage.textContent = data.message;
        withdrawMessage.style.color = data.success ? 'green' : 'red';
        updateWalletBalance();
    })
    .catch(error => console.error('Erreur:', error));
});

// Initialisation
updateWalletBalance();
