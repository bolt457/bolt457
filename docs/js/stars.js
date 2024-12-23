import express from 'express';
import { scrapeData } from './scraper.js';
import { fetchDataFromAPI } from './api_integration.js';
import Queue from 'bull';

document.addEventListener('DOMContentLoaded', function () {
    const starsTable = document.getElementById('stars-table');
    const addStarForm = document.getElementById('add-star-form');
    const starName = document.getElementById('star-name');
    const starBio = document.getElementById('star-bio');
    const starImage = document.getElementById('star-image');
    const starVideo = document.getElementById('star-video');
    const videoPreviewContainer = document.getElementById('video-preview-container');
    const starsContainer = document.getElementById('stars-container');

    const stars = [
        { name: 'Star 1', bio: 'Carrière exceptionnelle', image: 'star1.jpg', video: 'star1.mp4' },
        { name: 'Star 2', bio: 'Carrière prometteuse', image: 'star2.jpg', video: 'star2.mp4' }
    ];

    // Fonction pour afficher les stars dans le tableau
    function displayStars() {
        starsTable.innerHTML = ''; 
        stars.forEach(star => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${star.name}</td>
                <td>${star.bio}</td>
                <td><img src="images/${star.image}" alt="${star.name}" width="100"></td>
                <td>
                    <video width="100" controls>
                        <source src="videos/${star.video}" type="video/mp4">
                        Votre navigateur ne supporte pas la balise vidéo.
                    </video>
                </td>
                <td><button onclick="investInStar('${star.name}')">Investir</button></td>
            `;
            starsTable.appendChild(row);
        });
    }

    // Ajouter une star via le formulaire
    addStarForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newStar = {
            name: starName.value,
            bio: starBio.value,
            image: starImage.files[0]?.name || 'default.jpg',
            video: starVideo.files[0]?.name || 'default.mp4'
        };
        stars.push(newStar);
        displayStars();
        addStarForm.reset();
    });

    // Fonction pour investir dans une star
    window.investInStar = function (starName) {
        alert(`Investir dans ${starName}`);
    };

    // Fonction pour importer du contenu à partir d'une URL
    document.getElementById('import-content-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const starUrl = document.getElementById('star-url').value;
        if (starUrl) {
            const imgElement = document.createElement('img');
            imgElement.src = starUrl;
            imgElement.width = 200; // Taille de l'image
            starsContainer.appendChild(imgElement); // Ajouter l'image au container
            alert('Contenu importé avec succès');
        } else {
            alert('Veuillez entrer une URL valide');
        }
    });

    // Fonction pour ajouter une vidéo locale et la prévisualiser
    document.getElementById('add-video-form').addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const videoFile = document.getElementById('video-upload').files[0]; // Récupère le fichier vidéo
        if (videoFile) {
            // Prévisualisation de la vidéo
            const videoElement = document.createElement('video');
            videoElement.controls = true;
            videoElement.width = 300;
            videoElement.src = URL.createObjectURL(videoFile); // Crée une URL temporaire pour la vidéo
            videoPreviewContainer.innerHTML = ''; // Efface les prévisualisations précédentes
            videoPreviewContainer.appendChild(videoElement);

            // Envoi de la vidéo au serveur
            const formData = new FormData();
            formData.append('video', videoFile);

            try {
                const response = await fetch('/upload-video', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    alert('Vidéo téléchargée avec succès !');
                } else {
                    alert('Erreur lors du téléchargement de la vidéo.');
                }
            } catch (error) {
                console.error('Erreur lors du téléchargement de la vidéo :', error);
                alert('Une erreur est survenue.');
            }
        } else {
            alert('Veuillez sélectionner une vidéo à télécharger.');
        }
    });

    // Fonction pour scraper des données
    async function scrapeStarData() {
        const url = document.getElementById('scrape-url-input').value;
        if (url) {
            const data = await scrapeData(url);
            console.log(data);
        } else {
            alert("Veuillez entrer une URL valide.");
        }
    }

    // Fonction pour récupérer des données depuis une API
    async function fetchStarDataFromAPI() {
        const endpoint = document.getElementById('api-endpoint-input').value;
        const params = document.getElementById('api-params-input').value;
        if (endpoint) {
            const data = await fetchDataFromAPI(endpoint, params);
            console.log(data);
        } else {
            alert("Veuillez entrer un endpoint valide.");
        }
    }

    // Fonction pour lancer la mise à jour des cotes
    async function updateOdds() {
        try {
            const response = await fetch('/api/update_odds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('Erreur lors de la mise à jour des cotes :', error);
        }
    }

    // Afficher les stars dès le chargement
    displayStars();
});
// src/pages/Stars.js
import React from 'react';

function Stars() {
    return (
        <div>
            <h2>Investissez dans les Stars</h2>
            {/* Ajoute ici le contenu spécifique à la page des stars */}
            <div id="stars-container">
                {/* Ajoute ici la logique pour afficher les stars */}
            </div>
        </div>
    );
}

export default Stars;

