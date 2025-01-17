import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart'; // Pour kIsWeb
import 'package:flutter/services.dart';
import 'screens/home_screen.dart';
import 'screens/group_bet_screen.dart';
import 'screens/portfolio_screen.dart';
import 'screens/rewards_screen.dart';
import 'screens/tutorials_screen.dart';
import 'screens/invest.dart';
import 'screens/paris.dart';
import 'screens/admin_screen.dart';
import 'screens/payment_screen.dart';
import 'screens/wallet_screen.dart';
import 'screens/video_screen.dart';
import 'screens/login_screen.dart';
import 'screens/signup_screen.dart';
import 'screens/sign_in_page.dart';
import 'screens/profile_screen.dart';  // Assurez-vous que cette importation est présente

// Ajout de la classe MyErrorsHandler ici
class MyErrorsHandler {
  Future<void> initialize() async {
    // Initialisation (si nécessaire)
  }

  void onErrorDetails(FlutterErrorDetails details) {
    print('Flutter Error: ${details.exception}');
    print('Stack Trace: ${details.stack}');
  }

  void onError(Object error, StackTrace stack) {
    print('Error: $error');
    print('Stack Trace: $stack');
  }
}

// Instanciation de MyErrorsHandler
MyErrorsHandler myErrorsHandler = MyErrorsHandler();

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialisation de Firebase
  await Firebase.initializeApp(
    options: FirebaseOptions(
      apiKey: "AIzaSyCWEhKlUQhbtTDpB26-5dupL0T-bHOJmXA",
      authDomain: "afribet-de69d.firebaseapp.com",
      databaseURL: "https://afribet-de69d-default-rtdb.firebaseio.com",
      projectId: "afribet-de69d",
      storageBucket: "afribet-de69d.appspot.com",
      messagingSenderId: "820985331160",
      appId: "1:820985331160:web:3de4c3fc156f6338e906ad",
      measurementId: "G-J0G28ME35F",
    ),
  );

  // Conditionner la persistance hors ligne pour ne pas l'exécuter sur le web
  if (!kIsWeb) {
    FirebaseFirestore.instance.settings = const Settings(persistenceEnabled: true);
  }

  await myErrorsHandler.initialize();
  
  // Configuration de la gestion des erreurs
  FlutterError.onError = (details) {
    FlutterError.presentError(details);
    myErrorsHandler.onErrorDetails(details);
  };

  // Gestion des erreurs hors Flutter
  PlatformDispatcher.instance.onError = (error, stack) {
    myErrorsHandler.onError(error, stack);
    return true;
  };

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Afribet',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: FutureBuilder<User?>(
        future: FirebaseAuth.instance.authStateChanges().first, // Utilisez authStateChanges pour écouter les changements d'état
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const CircularProgressIndicator(); // Affiche un indicateur de chargement
          } else if (snapshot.hasData) {
            // Si l'utilisateur est connecté
            return const HomeScreen(); // Rediriger vers la HomeScreen
          } else {
            // Si l'utilisateur n'est pas connecté
            return const LoginScreen(); // Afficher la page de connexion
          }
        },
      ),
      routes: {
        '/group_bet': (context) => const GroupBetScreen(),
        '/portfolio': (context) => const PortfolioScreen(),
        '/rewards': (context) => const RewardsScreen(),
        '/tutorials': (context) => const TutorialsScreen(),
        '/invest': (context) => const InvestScreen(),
        '/paris': (context) => const ParisScreen(),
        '/admin': (context) => const AdminScreen(),
        '/payment': (context) => const PaymentScreen(),
        '/video_screen': (context) => const VideoScreen(),
        '/wallet': (context) => const WalletScreen(),
        '/sign_in': (context) => SignInPage(),
        '/create_profile': (context) => const CreateProfileScreen(), // Redirection vers CreateProfileScreen
        '/profile': (context) => const ProfileScreen(),
      },
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Afribet'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const LoginScreen()),
                );
              },
              child: const Text('Se connecter'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const SignupScreen()),
                );
              },
              child: const Text('S\'inscrire'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/create_profile');
              },
              child: const Text('Créer un profil'),
            ),
          ],
        ),
      ),
    );
  }
}

// Ajoutez ici la page CreateProfileScreen
class CreateProfileScreen extends StatelessWidget {
  const CreateProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Créer un Profil'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text("Page pour créer un profil utilisateur"),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const ProfileScreen()),
                );
              },
              child: const Text('Aller à mon profil'),
            ),
          ],
        ),
      ),
    );
  }
}
