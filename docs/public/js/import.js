import { addMedia, getMedia } from './indexeddb.js';

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
            addMedia(url); // Enregistrement dans IndexedDB
        } else if (url.match(/\.(mp4|webm)$/i)) {
            media = document.createElement('video');
            media.src = url;
            media.controls = true;
            addMedia(url); // Enregistrement dans IndexedDB
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
                addMedia(mediaUrl); // Enregistrement dans IndexedDB
            } else if (file.type.match('video.*')) {
                media = document.createElement('video');
                media.src = mediaUrl;
                media.controls = true;
                addMedia(mediaUrl); // Enregistrement dans IndexedDB
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
