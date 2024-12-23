import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Inscription d'un nouvel utilisateur
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Utilisateur inscrit:', userCredential.user);
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
  }
};

// Connexion d'un utilisateur existant
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Utilisateur connecté:', userCredential.user);
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
  }
};

// Exemple d'utilisation
signUp('utilisateur@example.com', 'motdepasse');
signIn('utilisateur@example.com', 'motdepasse');
