// Importez les modules Firebase nécessaires
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC_AC6Y58nXtGf9DHsRoYnNCh66DBOyZoQ',
  authDomain: 'device-streaming-e560d0c6.firebaseapp.com',
  projectId: 'device-streaming-e560d0c6',
  storageBucket: 'device-streaming-e560d0c6.appspot.com',
  messagingSenderId: '253144685018',
  appId: '1:253144685018:web:xxxxxxxxxxxxxx'
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter les services Firebase pour une utilisation dans d'autres fichiers
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
