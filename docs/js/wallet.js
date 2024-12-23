// Récupérer le solde
function fetchBalance() {
    fetch('/api/wallet/balance')
        .then(response => response.json())
        .then(data => {
            document.getElementById('wallet-balance').textContent = data.balance;
        })
        .catch(error => console.error('Erreur lors de la récupération du solde:', error));
}

// Déposer des Africoins
function depositAfricoins(amount) {
    fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
    })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error('Erreur lors du dépôt:', error));
}

// Retirer des Africoins
function withdrawAfricoins(amount) {
    fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
    })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error('Erreur lors du retrait:', error));
}
