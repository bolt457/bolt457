// indexeddb.js

let db;
const request = indexedDB.open('MediaDatabase', 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore('media', { keyPath: 'id' });
    objectStore.createIndex('url', 'url', { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log('IndexedDB initialisé avec succès');
};

request.onerror = function(event) {
    console.error('Erreur lors de l\'initialisation de IndexedDB', event);
};

// Fonction pour ajouter des URL de média dans IndexedDB
function addMedia(mediaUrl) {
    const transaction = db.transaction(['media'], 'readwrite');
    const objectStore = transaction.objectStore('media');
    const media = { id: Date.now(), url: mediaUrl };
    const request = objectStore.add(media);

    request.onsuccess = function() {
        console.log('URL de média ajoutée avec succès à IndexedDB');
    };

    request.onerror = function() {
        console.error('Erreur lors de l\'ajout de l\'URL de média à IndexedDB');
    };
}

// Fonction pour récupérer les URL de média depuis IndexedDB
function getMedia(callback) {
    const transaction = db.transaction(['media'], 'readonly');
    const objectStore = transaction.objectStore('media');
    const request = objectStore.getAll();

    request.onsuccess = function(event) {
        callback(event.target.result);
    };

    request.onerror = function() {
        console.error('Erreur lors de la récupération des URL de média depuis IndexedDB');
    };
}

// Exporter les fonctions pour utilisation dans d'autres fichiers
export { addMedia, getMedia };
