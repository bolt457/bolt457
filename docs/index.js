import React from 'react';
import ReactDOM from 'react-dom';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './index.css';

// Composant d'Animation
const AnimatedComponent = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

// Écrans Individuels
const HomeScreen = ({ navigation }) => (
  <AnimatedComponent>
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <h1>Bienvenue sur AfricoinMarket</h1>
      <button onClick={() => navigation.navigate('Africoin')}>En savoir plus sur les Africoins</button>
    </div>
  </AnimatedComponent>
);

const AfricoinScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h1>Page des Africoins</h1>
  </div>
);

const ShopScreen = () => (
  <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <h1>Page de la Boutique</h1>
  </div>
);

// Navigateur Principal
const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Africoin" component={AfricoinScreen} />
      <Stack.Screen name="Shop" component={ShopScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker enregistré avec succès:', registration);
      })
      .catch((error) => {
        console.log('Échec de l\'enregistrement du Service Worker:', error);
      });
  });
}
