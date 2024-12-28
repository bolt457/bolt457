import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// Composant pour la page d'accueil
function Home() {
  return <h2>Page d'Accueil</h2>;
}

// Composant pour la page À Propos
function About() {
  return <h2>À Propos</h2>;
}

function App() {
  const [message, setMessage] = useState("Bienvenue sur AfricoinMarket"); // Utilisation correcte
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch('https://api.example.com/data') // Remplacez par votre API
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Valeur saisie : ${inputValue}`);
    setInputValue(""); // Réinitialiser le champ
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{message}</h1>
          <p>Votre plateforme de pari et d'investissement.</p>
          <a
            className="App-link"
            href="https://bolt457.github.io/bolt457/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Accueil - AfricoinMarket
          </a>
          <h2>Données récupérées :</h2>
          <ul>
            {data.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Entrez quelque chose"
            />
            <button type="submit">Envoyer</button>
          </form>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;