document.getElementById('investmentForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const companyName = document.getElementById('companyName').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (!companyName || amount <= 0) {
        alert('Veuillez entrer un nom d\'entreprise valide et un montant positif.');
        return;
    }

    const investment = {
        companyName: companyName,
        amount: amount,
        currency: 'Africoins',
        type: 'investment'
    };

    try {
        const response = await fetch('http://localhost:3000/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(investment)
        });

        if (response.ok) {
            const data = await response.json();
            alert('Investissement réalisé avec succès en Africoins !');
            loadInvestments();
        } else {
            alert('Erreur lors de l\'investissement. Veuillez réessayer.');
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur réseau. Veuillez vérifier votre connexion.');
    }
});

async function loadInvestments() {
    try {
        const response = await fetch('http://localhost:3000/api/transactions');
        if (!response.ok) throw new Error('Erreur de chargement des investissements.');

        const investments = await response.json();
        const investmentList = document.getElementById('investmentList');
        investmentList.innerHTML = '';

        investments.forEach(investment => {
            const li = document.createElement('li');
            li.textContent = `${investment.amount} Africoins dans ${investment.companyName}`;
            investmentList.appendChild(li);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des investissements :', error);
    }
}

window.onload = loadInvestments;
