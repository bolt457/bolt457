import React from 'react';

function InvestButton({ starId }) {
    const handleInvest = () => {
        alert(`Investir dans la star ID: ${starId}`);
    };

    return (
        <button onClick={handleInvest}>Investir</button>
    );
}

export default InvestButton;
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
