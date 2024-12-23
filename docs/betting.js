// betting.js

// Fonction pour récupérer les trophées depuis l'API
async function fetchTrophies() {
    try {
        const response = await fetch('http://localhost:3000/api/trophies'); // API de récupération des trophées
        const data = await response.json();
        return data; // Retourne les trophées récupérés
    } catch (error) {
        console.error('Erreur de récupération des trophées:', error);
        return [];
    }
}

// Fonction pour afficher les trophées dans la page
function displayTrophies(trophies) {
    const trophiesDiv = document.getElementById('trophies');
    trophiesDiv.innerHTML = ''; // Effacer la liste avant d'ajouter de nouveaux trophées
    trophies.forEach(trophy => {
        const trophyDiv = document.createElement('div');
        trophyDiv.classList.add('trophy');
        trophyDiv.innerHTML = `
            <p><strong>${trophy.name}</strong></p>
            <p>${trophy.category}</p>
            <p>Cote: ${trophy.odds} AFRICOINS</p>
        `;
        trophiesDiv.appendChild(trophyDiv);
    });
}

// Fonction de recherche de trophées
async function searchTrophies() {
    const starName = document.getElementById('starSearch').value.toLowerCase();

    if (!starName) {
        alert('Veuillez entrer le nom d\'une star pour rechercher ses trophées.');
        return;
    }

    const trophiesData = await fetchTrophies();

    // Filtrer les trophées en fonction du nom de la star
    const filteredTrophies = trophiesData.filter(trophy => trophy.name.toLowerCase().includes(starName));

    // Afficher les trophées filtrés
    displayTrophies(filteredTrophies);
}

// Afficher les trophées lors du chargement de la page
window.onload = function() {
    fetchTrophies(); // Charger les trophées
};
