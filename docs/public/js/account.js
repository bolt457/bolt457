document.addEventListener("DOMContentLoaded", function() {
    const userAccount = {
        balance: 100,  // Exemple de solde initial
        investments: [
            { star: "Star A", amountInvested: 50, currentValue: 60 },
            { star: "Star B", amountInvested: 30, currentValue: 35 }
        ]
    };

    const balanceElement = document.getElementById("account-balance");
    const investmentsElement = document.getElementById("investment-list");

    // Afficher le solde
    balanceElement.textContent = `Solde en AFRICOINS : ${userAccount.balance}`;

    // Afficher les investissements
    userAccount.investments.forEach(investment => {
        const investmentElement = document.createElement("li");
        investmentElement.textContent = `${investment.star}: ${investment.amountInvested} AFRICOINS investis, Valeur actuelle: ${investment.currentValue} AFRICOINS`;
        investmentsElement.appendChild(investmentElement);
    });

    // Ajouter la logique pour mettre à jour les informations de l'utilisateur (ex. via un formulaire)
    const updateButton = document.getElementById("update-button");
    updateButton.addEventListener("click", function() {
        // Logique pour mettre à jour les informations (ex. appeler une API, afficher un formulaire, etc.)
        console.log("Mise à jour du compte...");
    });
});

