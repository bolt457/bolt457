// Exemple de données de taux de change simulées
let exchangeRates = {
    USD_TO_AFRICOIN: 1, // Exemple : 1 USD = 1 Africoin
    LOCAL_TO_USD: 0.5  // Exemple : 1 unité locale = 0.5 USD
};

// Fonction pour récupérer les taux de change
function getExchangeRates() {
    // Simule une mise à jour des taux de change avec des valeurs aléatoires
    exchangeRates.USD_TO_AFRICOIN = (Math.random() * 10).toFixed(2);
    exchangeRates.LOCAL_TO_USD = (Math.random() * 1).toFixed(2);

    return exchangeRates;
}

// Fonction pour afficher les taux de change dans un élément HTML
function displayExchangeRates(containerId) {
    const rates = getExchangeRates();
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <p>1 USD = ${rates.USD_TO_AFRICOIN} Africoin</p>
            <p>1 unité locale = ${rates.LOCAL_TO_USD} USD</p>
        `;
    }
}

// Exportation pour utilisation dans d'autres fichiers
export { getExchangeRates, displayExchangeRates };

