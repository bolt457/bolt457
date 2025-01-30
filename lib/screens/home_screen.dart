import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

// Importation des écrans avec alias pour éviter les conflits
import 'admin_screen.dart';
import 'video_screen.dart' as video; // Alias pour VideoScreen
import 'group_bet_screen.dart';
import 'portfolio_screen.dart';
import 'rewards_screen.dart';
import 'tutorials_screen.dart';
import 'invest.dart';
import 'paris.dart';
import 'profile_screen.dart' as profile; // Utilisation d'un alias
import 'wallet_screen.dart';
import 'login_screen.dart';
import 'create_profile_screen.dart';
import 'post_screen.dart' as post; // Alias pour PostScreen
import 'chatbot_screen.dart'; // Importation du ChatbotScreen
import 'game_screen.dart'; // Importation du GameScreen

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
    // Liste des icônes et des écrans correspondants
    final List<Map<String, dynamic>> _menuItems = [
      {'icon': Icons.account_balance_wallet, 'label': 'Portefeuille', 'screen': WalletScreen()},
      {
        'icon': Icons.video_library,
        'label': 'Vidéos',
        'screen': const video.VideoScreen(), // Utilisation de l'alias pour VideoScreen
      },
      {'icon': Icons.group, 'label': 'Pari de Groupe', 'screen': GroupBetScreen()},
      {'icon': Icons.account_tree, 'label': 'Portefeuille', 'screen': PortfolioScreen()},
      {'icon': Icons.card_giftcard, 'label': 'Récompenses', 'screen': RewardsScreen()},
      {'icon': Icons.book, 'label': 'Tutoriels', 'screen': TutorialsScreen()},
      {'icon': Icons.monetization_on, 'label': 'Investir', 'screen': InvestScreen()},
      {'icon': Icons.sports, 'label': 'Paris', 'screen': ParisScreen()},
      {'icon': Icons.person, 'label': 'Profil', 'screen': profile.ProfileScreen()}, // Utilisation de l'alias
      {'icon': Icons.admin_panel_settings, 'label': 'Admin', 'screen': AdminScreen()},
      {
        'icon': Icons.person_add,
        'label': 'Créer Profil',
        'screen': CreateProfileScreen(), // Suppression du paramètre onProfileUpdated
      },
      {'icon': Icons.message, 'label': 'Publications', 'screen': const post.PostScreen()}, // Utilisation de l'alias pour PostScreen
      {'icon': Icons.chat, 'label': 'Chatbot', 'screen': ChatbotScreen()}, // Ajout du ChatbotScreen
      {'icon': Icons.gamepad, 'label': 'Jeux', 'screen': GameScreen()}, // Ajout de GameScreen
    ];

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
      body: GridView.builder(
        padding: const EdgeInsets.all(10),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2, // Nombre de colonnes
          childAspectRatio: 3 / 2, // Ratio hauteur/largeur
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
        ),
        itemCount: _menuItems.length,
        itemBuilder: (context, index) {
          final item = _menuItems[index];
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => item['screen']),
              );
            },
            child: Card(
              color: Colors.blueAccent,
              elevation: 5,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    item['icon'],
                    size: 40,
                    color: Colors.white,
                  ),
                  const SizedBox(height: 10),
                  Text(
                    item['label'],
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
