// Exemple : Obtenir le solde
fetch('http://127.0.0.1:5000/api/wallet/balance')
    .then(response => response.json())
    .then(data => {
        console.log('Solde actuel:', data.balance);
        document.getElementById('wallet-balance').textContent = data.balance;
    })
    .catch(error => console.error('Erreur:', error));

// Exemple : Dépôt
fetch('http://127.0.0.1:5000/api/wallet/deposit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 50 }) // Déposer 50 Africoins
})
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Erreur:', error));
