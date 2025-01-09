import 'package:flutter/material.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'login_screen.dart';
import 'signup_screen.dart';
import 'wallet_screen.dart';
import 'admin_screen.dart';
import 'video_screen.dart';
import 'group_bet_screen.dart';
import 'portfolio_screen.dart';
import 'rewards_screen.dart';
import 'tutorials_screen.dart';
import 'invest.dart';
import 'paris.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  @override
  void initState() {
    super.initState();
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      debugPrint('Notification reçue : ${message.notification?.title}');
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: Text(message.notification?.title ?? 'Notification'),
          content: Text(message.notification?.body ?? 'Vous avez une nouvelle notification.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('OK'),
            ),
          ],
        ),
      );
    });
  }

  void _signOut() async {
    await _auth.signOut();
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (context) => const LoginScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Afribet'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: _signOut,
          ),
        ],
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
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const WalletScreen()),
                );
              },
              child: const Text('Portefeuille Africoins'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const AdminScreen()),
                );
              },
              child: const Text('Admin - Ajouter des fonds'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/group_bet');
              },
              child: const Text('Pari de Groupe'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/portfolio');
              },
              child: const Text('Suivi des Portefeuilles'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/rewards');
              },
              child: const Text('Récompenses'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/tutorials');
              },
              child: const Text('Tutoriels'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/invest');
              },
              child: const Text('Investissements'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/paris');
              },
              child: const Text('Paris'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/video_screen'); // Bouton pour naviguer vers l'écran vidéo
              },
              child: const Text('Voir la vidéo'),
            ),
          ],
        ),
      ),
    );
  }
}

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Afribet',
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),
        '/login': (context) => const LoginScreen(),
        '/signup': (context) => const SignupScreen(),
        '/wallet': (context) => const WalletScreen(),
        '/admin': (context) => const AdminScreen(),
        '/video_screen': (context) => const VideoScreen(),
        '/group_bet': (context) => const GroupBetScreen(),
        '/portfolio': (context) => const PortfolioScreen(),
        '/rewards': (context) => const RewardsScreen(),
        '/tutorials': (context) => const TutorialsScreen(),
        '/invest': (context) => const InvestScreen(),
        '/paris': (context) => const ParisScreen(),
      },
    );
  }
}