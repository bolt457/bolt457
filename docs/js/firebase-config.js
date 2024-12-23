// Importation des modules Firebase nécessaires
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging.js";

// Configuration Firebase (remplacez avec vos clés Firebase)
const firebaseConfig = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "VOTRE_APP.firebaseapp.com",
    projectId: "VOTRE_PROJECT_ID",
    storageBucket: "VOTRE_APP.appspot.com",
    messagingSenderId: "VOTRE_SENDER_ID",
    appId: "VOTRE_APP_ID",
    measurementId: "VOTRE_MEASUREMENT_ID"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore
const db = getFirestore(app);

// Initialisation de Firebase Auth
const auth = getAuth(app);

// Initialisation de Firebase Cloud Messaging
const messaging = getMessaging(app);

// --------------- Firestore - Ajouter et lire des données ---------------

// Fonction pour ajouter des données dans Firestore
async function addData() {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            name: "John Doe",
            email: "john@example.com"
        });
        console.log("Document écrit avec ID: ", docRef.id);
    } catch (e) {
        console.error("Erreur ajoutant le document: ", e);
    }
}

// Fonction pour lire des données depuis Firestore
async function readData() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}

// Appel des fonctions Firestore pour tester
addData();
readData();

// --------------- Authentification - Création et connexion des utilisateurs ---------------

// Fonction pour créer un utilisateur avec email et mot de passe
async function createUser() {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, "john@example.com", "123456");
        console.log("Utilisateur créé : ", userCredential.user);
    } catch (error) {
        console.error("Erreur création utilisateur : ", error);
    }
}

// Fonction pour connecter un utilisateur avec email et mot de passe
async function loginUser() {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, "john@example.com", "123456");
        console.log("Utilisateur connecté : ", userCredential.user);
    } catch (error) {
        console.error("Erreur connexion utilisateur : ", error);
    }
}

// Appel des fonctions d'authentification pour tester
createUser();
loginUser();

// --------------- Notifications - Obtenir le token et gérer les messages ---------------

// Fonction pour obtenir le token de notification de l'appareil
async function getNotificationToken() {
    try {
        const currentToken = await getToken(messaging, { vapidKey: "VOTRE_VAPID_KEY" });
        if (currentToken) {
            console.log("Token de notification : ", currentToken);
        } else {
            console.log("Pas de token disponible.");
        }
    } catch (error) {
        console.error("Erreur obtenant le token de notification : ", error);
    }
}

// Fonction pour gérer les messages reçus via FCM
onMessage(messaging, (payload) => {
    console.log("Message reçu : ", payload);
});

// Appel de la fonction pour obtenir un token de notification
getNotificationToken();
 if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(error) {
        console.log('Service Worker registration failed:', error);
    });
} else {
    console.log('Service Workers are not supported by this browser.');
}
