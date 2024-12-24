import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const database = getDatabase();

function saveMediaToDatabase(mediaUrl) {
    const mediaRef = ref(database, 'media/' + Date.now());
    set(mediaRef, {
        url: mediaUrl,
        timestamp: Date.now()
    }).then(() => {
        console.log("Media saved successfully.");
    }).catch((error) => {
        console.error("Error saving media: ", error);
    });
}

// Fonction pour importer une image/vidéo depuis une URL
window.importFromURL = function() {
    const url = document.getElementById('urlInput').value;
    const container = document.getElementById('gif-container');

    if (url) {
        let media;

        // Détecter le type de média (image ou vidéo)
        if (url.match(/\.(jpeg|jpg|gif|png)$/i)) {
            media = document.createElement('img');
            media.src = url;
            media.alt = "Publicité depuis URL";
            saveMediaToDatabase(url); // Enregistrement dans Firebase
        } else if (url.match(/\.(mp4|webm)$/i)) {
            media = document.createElement('video');
            media.src = url;
            media.controls = true;
            saveMediaToDatabase(url); // Enregistrement dans Firebase
        } else {
            alert("URL non valide. Assurez-vous d'utiliser une URL d'image ou de vidéo valide.");
            return;
        }

        // Ajouter le média à la section de publicité
        container.innerHTML = ""; // Effacer les précédents contenus
        container.appendChild(media);
    } else {
        alert("Veuillez entrer une URL valide.");
    }
};

// Fonction pour importer une image/vidéo depuis l'ordinateur
window.importFromFile = function() {
    const fileInput = document.getElementById('fileInput');
    const container = document.getElementById('gif-container');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const mediaUrl = event.target.result;
            let media;

            // Détecter le type de fichier (image ou vidéo)
            if (file.type.match('image.*')) {
                media = document.createElement('img');
                media.src = mediaUrl;
                media.alt = "Publicité depuis votre ordinateur";
                saveMediaToDatabase(mediaUrl); // Enregistrement dans Firebase
            } else if (file.type.match('video.*')) {
                media = document.createElement('video');
                media.src = mediaUrl;
                media.controls = true;
                saveMediaToDatabase(mediaUrl); // Enregistrement dans Firebase
            }

            // Ajouter le média à la section de publicité
            container.innerHTML = ""; // Effacer les précédents contenus
            container.appendChild(media);
        };

        reader.readAsDataURL(file);
    } else {
        alert("Veuillez sélectionner un fichier.");
    }
};

// Fonction pour soumettre un commentaire
window.submitComment = function() {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value;

    if (commentText) {
        const commentRef = ref(database, 'comments/' + Date.now());
        set(commentRef, {
            text: commentText,
            timestamp: Date.now()
        }).then(() => {
            commentInput.value = ''; // Réinitialiser le champ de saisie
            loadComments(); // Recharger les commentaires
        }).catch((error) => {
            console.error("Erreur lors de l'envoi du commentaire: ", error);
        });
    } else {
        alert("Veuillez entrer un commentaire.");
    }
};

// Fonction pour charger et afficher les commentaires
window.loadComments = function() {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = ''; // Effacer les précédents commentaires

    const commentsRef = ref(database, 'comments');
    onValue(commentsRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const comment = childSnapshot.val();
            const commentElement = document.createElement('div');
            commentElement.textContent = comment.text; // Afficher le texte du commentaire
            commentsContainer.appendChild(commentElement);
        });
    });
};

// Charger les commentaires lors du chargement de la page
window.addEventListener('load', window.loadComments);
