const multer = require('multer');
const path = require('path');

// Configuration du stockage des jeux
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/games/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Vérifie si le fichier est HTML
  if (file.mimetype === 'text/html') {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers HTML sont acceptés'), false);
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
document.getElementById('gameUploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const response = await fetch('/upload-game', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  document.getElementById('uploadResponse').textContent = result.message;
});
