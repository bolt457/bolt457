// frontend.js
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

    // Afficher les stars dès le chargement
    displayStars();
});
