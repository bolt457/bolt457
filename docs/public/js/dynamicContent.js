// Endpoint pour les faits sur les chats
const API_ENDPOINT = 'https://cat-fact.herokuapp.com/facts';

// Fonction pour récupérer les faits sur les chats
async function fetchCatFacts() {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    displayCatFacts(data);
  } catch (error) {
    console.error('Error fetching cat facts:', error);
  }
}

// Fonction pour afficher les faits sur les chats
function displayCatFacts(facts) {
  const container = document.getElementById('cat-facts-container');
  facts.forEach(fact => {
    const factElement = document.createElement('div');
    factElement.textContent = fact.text;
    container.appendChild(factElement);
  });
}

// Endpoint et clé d'accès pour les images de chiens depuis Unsplash
const API_ROOT = 'https://api.unsplash.com';
const accessKey = 'tJR5d0OlBU7sUp03zLPgkCky8-PweUVA5huhB9i3Ts'; // Remplace par ta clé d'accès Unsplash

// Fonction pour récupérer les images de chiens
async function fetchDogImages() {
  try {
    const response = await fetch(`${API_ROOT}/photos/random?client_id=${accessKey}&count=10&collections=3816141,1154337,1254279`);
    const images = await response.json();
    displayDogImages(images);
  } catch (error) {
    console.error('Error fetching dog images:', error);
  }
}

// Fonction pour afficher les images de chiens
function displayDogImages(images) {
  const container = document.getElementById('dog-images-container');
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.urls.small;
    container.appendChild(imgElement);
  });
}

// Appel des fonctions lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('cat-facts-container')) {
    fetchCatFacts();
  }
  if (document.getElementById('dog-images-container')) {
    fetchDogImages();
  }
});
