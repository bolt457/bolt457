import React, { useState } from 'react';
import logo from './logo.svg'; // Assure-toi que ce fichier existe
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [media, setMedia] = useState(null);

  const importFromURL = () => {
    let mediaElement;
    if (url.match(/\.(jpeg|jpg|gif|png)$/i)) {
      mediaElement = <img src={url} alt="Publicité depuis URL" />;
    } else if (url.match(/\.(mp4|webm)$/i)) {
      mediaElement = <video src={url} controls />;
    } else {
      alert("URL non valide. Assurez-vous d'utiliser une URL d'image ou de vidéo valide.");
      return;
    }
    setMedia(mediaElement);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <h2>Investissez dans les Stars</h2>
        <div id="stars-container">{media}</div>
        <div>
          <input
            type="text"
            id="urlInput"
            placeholder="Entrez l'URL de l'image ou de la vidéo"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={importFromURL}>Importer</button>
        </div>
      </main>
    </div>
  );
}

export default App;
