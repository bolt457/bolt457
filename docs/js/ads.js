document.addEventListener('DOMContentLoaded', () => {
    const adUploadForm = document.getElementById('ad-upload-form');
    const africoinBalanceInput = document.getElementById('africoin-balance');
    const adsList = document.getElementById('ads-list');
    const AD_COST = 10; // Coût de la publicité en AFRICOINS

    /**
     * Gérer la soumission du formulaire d'importation de publicités.
     */
    adUploadForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const fileInput = document.getElementById('ad-file');
        const africoinBalance = parseFloat(africoinBalanceInput.value);

        // Vérification du solde en AFRICOINS
        if (africoinBalance < AD_COST) {
            alert(`Vous avez besoin de ${AD_COST} AFRICOINS pour importer une publicité.`);
            return;
        }

        // Récupération du fichier publicitaire
        const adFile = fileInput.files[0];
        if (!adFile) {
            alert("Veuillez sélectionner un fichier à importer.");
            return;
        }

        // Création de l'élément pour afficher la publicité
        const adElement = document.createElement(adFile.type.startsWith("video") ? "video" : "img");
        adElement.src = URL.createObjectURL(adFile);
        adElement.controls = adFile.type.startsWith("video"); // Active les contrôles si c'est une vidéo
        adElement.width = 300;
        adElement.alt = "Publicité Importée";

        // Ajouter la publicité dans la liste
        const adContainer = document.createElement('div');
        adContainer.classList.add('ad-container'); // Classe CSS pour le style
        adContainer.appendChild(adElement);
        adsList.appendChild(adContainer);

        // Mise à jour du solde en AFRICOINS
        const remainingBalance = africoinBalance - AD_COST;
        africoinBalanceInput.value = remainingBalance;

        alert("Publicité importée avec succès ! Votre solde a été mis à jour.");
    });
});
