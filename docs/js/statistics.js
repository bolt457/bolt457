document.addEventListener('DOMContentLoaded', function () {
    // Exemple de données de performances des investissements
    const investmentStats = [
        { star: 'Star 1', totalInvestments: '$5000', currentValue: '$5500', performance: '10%' },
        { star: 'Star 2', totalInvestments: '$3000', currentValue: '$2900', performance: '-3.33%' }
    ];

    const investmentPerformanceTable = document.getElementById('investment-performance');

    // Afficher les statistiques d'investissement
    function displayInvestmentStats() {
        investmentPerformanceTable.innerHTML = ''; // Réinitialiser le tableau
        investmentStats.forEach(stat => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stat.star}</td>
                <td>${stat.totalInvestments}</td>
                <td>${stat.currentValue}</td>
                <td>${stat.performance}</td>
            `;
            investmentPerformanceTable.appendChild(row);
        });
    }

    // Afficher les statistiques au chargement de la page
    displayInvestmentStats();
});
