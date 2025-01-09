import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'screens/home_screen.dart';
import 'screens/group_bet_screen.dart';
import 'screens/portfolio_screen.dart';
import 'screens/rewards_screen.dart';
import 'screens/tutorials_screen.dart';
import 'screens/invest.dart';
import 'screens/paris.dart';
import 'screens/admin_screen.dart';
import 'screens/payment_screen.dart'; // Import de l'écran Payment
import 'screens/wallet_screen.dart'; // Import de WalletScreen
import 'screens/video_screen.dart'; // Assurez-vous d'importer ce fichier
import 'screens/login_screen.dart'; // Assurez-vous que LoginScreen est bien importé
import 'screens/signup_screen.dart'; // Assurez-vous que SignupScreen est bien importé

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: FirebaseOptions(
      apiKey: "AIzaSyD8pDQPcl8tHbHG6RsOzm16zEYgun58Ebg",
      authDomain: "afrimarket-197d0.firebaseapp.com",
      projectId: "afrimarket-197d0",
      storageBucket: "afrimarket-197d0.appspot.com",
      messagingSenderId: "898528400538",
      appId: "1:898528400538:web:7b651d10523c6f52c1bb23",
      measurementId: "G-NW0N95K3ZN",
    ),
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key); // Ajout du constructeur constant

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Afribet',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomeScreen(), // Utilisation du constructeur constant
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
        '/wallet': (context) => const WalletScreen(), // Ajout de la route pour WalletScreen
      },
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key); // Ajout du constructeur constant

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Afribet'), // Utilisation de const
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const LoginScreen()), // Utilisation du constructeur constant
                );
              },
              child: const Text('Se connecter'), // Utilisation de const
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const SignupScreen()), // Utilisation du constructeur constant
                );
              },
              child: const Text('S\'inscrire'), // Utilisation de const
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/video_screen'); // Navigation vers l'écran vidéo
              },
              child: const Text('Voir la vidéo'), // Utilisation de const
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/wallet'); // Navigation vers WalletScreen
              },
              child: const Text('Portefeuille'), // Utilisation de const
            ),
          ],
        ),
      ),
    );
  }
}