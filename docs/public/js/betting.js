// betting.js

// Fonction pour afficher l'historique des paris
function displayBets() {
    const bets = JSON.parse(localStorage.getItem('bets')) || [];
    const betList = document.getElementById('betList');
    betList.innerHTML = ''; // Effacer les anciens paris

    bets.forEach((bet) => {
        const betItem = document.createElement('li');
        betItem.textContent = `Pari sur ${bet.star} de ${bet.amount} AFRICOINS. Résultat : ${bet.result}`;
        betList.appendChild(betItem);
    });
}

// Fonction pour gérer un pari
document.getElementById('betForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const star = document.getElementById('star').value;
    const amount = parseFloat(document.getElementById('betAmount').value);

    // Vérification du solde avant le pari
    const userBalance = getUserBalance(); // Cette fonction récupère le solde d'AFRICOINS de l'utilisateur
    if (amount > userBalance) {
        alert("Vous n'avez pas assez d'AFRICOINS pour ce pari.");
        return;
    }

    // Enregistrer le pari
    const bet = {
        star: star,
        amount: amount,
        result: 'En attente' // Le résultat sera mis à jour plus tard
    };
    let bets = JSON.parse(localStorage.getItem('bets')) || [];
    bets.push(bet);
    localStorage.setItem('bets', JSON.stringify(bets));

    // Afficher les paris
    displayBets();
});

// Afficher les paris au chargement
displayBets();
