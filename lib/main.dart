import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/services.dart'; // Pour PlatformDispatcher
import 'dart:ui'; // Pour PlatformDispatcher

// Importation des écrans avec des alias
import 'screens/portfolio_screen.dart';
import 'screens/rewards_screen.dart';
import 'screens/tutorials_screen.dart';
import 'screens/invest.dart';
import 'screens/paris.dart';
import 'screens/admin_screen.dart';
import 'screens/payment_screen.dart';
import 'screens/wallet_screen.dart';
import 'screens/video_screen.dart' as video; // Alias pour VideoScreen
import 'screens/login_screen.dart';
import 'screens/signup_screen.dart';
import 'screens/profile_screen.dart' as profile; // Utilisation d'un alias
import 'screens/create_profile_screen.dart';
import 'screens/home_screen.dart'; 
import 'screens/group_bet_screen.dart'; 
import 'screens/post_screen.dart' as post; // Alias pour PostScreen
import 'screens/join_live_screen.dart'; 
import 'screens/chatbot_screen.dart'; 
import 'screens/game_screen.dart'; 

class MyErrorsHandler {
  Future<void> initialize() async {
    // Initialisation si nécessaire
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

MyErrorsHandler myErrorsHandler = MyErrorsHandler();

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: const FirebaseOptions(
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

  if (!kIsWeb) {
    FirebaseFirestore.instance.settings = const Settings(persistenceEnabled: true);
  }

  await myErrorsHandler.initialize();

  FlutterError.onError = (details) {
    FlutterError.presentError(details);
    myErrorsHandler.onErrorDetails(details);
  };

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
        scaffoldBackgroundColor: Colors.grey[100],
      ),
      home: StreamBuilder<User?>(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Scaffold(
              body: Center(
                child: CircularProgressIndicator(),
              ),
            );
          }

          if (snapshot.hasData) {
            return const HomeScreen(); // Rediriger vers HomeScreen si connecté
          }

          return const AuthScreen(); // Afficher l'écran d'authentification si non connecté
        },
      ),
      routes: {
        '/login': (context) => const LoginScreen(),
        '/signup': (context) => const SignupScreen(),
        '/create_profile': (context) => CreateProfileScreen(
          onProfileUpdated: () {
            Navigator.popUntil(context, ModalRoute.withName('/home'));
          },
        ),
        '/home': (context) => const HomeScreen(),
        '/game': (context) => const video.VideoScreen(), // Utilisation de l'alias pour VideoScreen
        '/group_bet': (context) => const GroupBetScreen(),
        '/portfolio': (context) => const PortfolioScreen(),
        '/rewards': (context) => const RewardsScreen(),
        '/tutorials': (context) => const TutorialsScreen(),
        '/invest': (context) => const InvestScreen(),
        '/paris': (context) => const ParisScreen(),
        '/admin': (context) => const AdminScreen(),
        '/payment': (context) => const PaymentScreen(),
        '/video_screen': (context) => const video.VideoScreen(), // Utilisation de l'alias pour VideoScreen
        '/wallet': (context) => const WalletScreen(),
        '/profile': (context) => profile.ProfileScreen(), // Utilisation de l'alias
        '/posts': (context) => const post.PostScreen(), // Utilisation de l'alias pour PostScreen
        '/join_live': (context) => JoinLiveScreen(),
        '/chatbot': (context) => ChatbotScreen(),
      },
    );
  }
}

class AuthScreen extends StatelessWidget {
  const AuthScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.blue[700]!, Colors.blue[900]!],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.sports_soccer,
                    size: 120,
                    color: Colors.white,
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'Afribet',
                    style: TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 48),
                  ElevatedButton(
                    onPressed: () => Navigator.pushNamed(context, '/login'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: Colors.blue[900],
                      padding: const EdgeInsets.symmetric(horizontal: 48, vertical: 16),
                      minimumSize: const Size(double.infinity, 54),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: const Text(
                      'Se connecter',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ),
                  const SizedBox(height: 16),
                  OutlinedButton(
                    onPressed: () => Navigator.pushNamed(context, '/signup'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.white,
                      side: const BorderSide(color: Colors.white, width: 2),
                      padding: const EdgeInsets.symmetric(horizontal: 48, vertical: 16),
                      minimumSize: const Size(double.infinity, 54),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: const Text(
                      'S\'inscrire',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class GroupBetScreen extends StatelessWidget {
  const GroupBetScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Pari de Groupe'),
      ),
      body: const Center(
        child: Text('Écran du Pari de Groupe'),
      ),
    );
  }
}

class VideoScreen extends StatelessWidget {
  const VideoScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Vidéos'),
      ),
      body: const Center(
        child: Text('Écran des vidéos'),
      ),
    );
  }
}
