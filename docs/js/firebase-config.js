import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging.js";

// Configuration Firebase (remplacez avec vos clés Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyC_AC6Y58nXtGf9DHsRoYnNCh66DBOyZoQ",
    authDomain: "device-streaming-e560d0c6.firebaseapp.com",
    databaseURL: "https://device-streaming-e560d0c6.firebaseio.com",
    projectId: "device-streaming-e560d0c6",
    storageBucket: "device-streaming-e560d0c6.appspot.com",
    messagingSenderId: "253144685018",
    appId: "1:253144685018:android:e5602abec757331c4508e3",
    measurementId: "YOUR_MEASUREMENT_ID" // Assurez-vous d'ajouter votre measurement ID si vous en avez un
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore
const db = getFirestore(app);

// Initialisation de Firebase Auth
const auth = getAuth(app);

// Initialisation de Firebase Cloud Messaging
const messaging = getMessaging(app);

export { db, auth, messaging };
