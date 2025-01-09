import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:intl/intl.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key); // Constructeur constant

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Paris - Star et Bourse du jour',
      home: const ParisScreen(),
    );
  }
}

class ParisScreen extends StatefulWidget {
  const ParisScreen({Key? key}) : super(key: key); // Constructeur constant

  @override
  _ParisScreenState createState() => _ParisScreenState();
}

class _ParisScreenState extends State<ParisScreen> {
  Map<String, dynamic>? data;

  @override
  void initState() {
    super.initState();
    loadJsonData();
  }

  Future<void> loadJsonData() async {
    final String response = await rootBundle.loadString('assets/data.json');
    final data = await json.decode(response);
    setState(() {
      this.data = data;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (data == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Paris - Star et Bourse du jour')),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    DateTime now = DateTime.now();
    String formattedDate = DateFormat('yyyy-MM-dd').format(now);

    // Trouver les informations pour la date actuelle
    Map<String, dynamic>? todayStarInfo = (data!['stars'] as List<dynamic>).firstWhere(
      (info) => info['date'] == formattedDate,
      orElse: () => {'name': 'Aucune star', 'message': 'Aucune information disponible.', 'imageUrl': ''},
    );

    Map<String, dynamic>? todayBourseInfo = (data!['bourses'] as List<dynamic>).firstWhere(
      (info) => info['date'] == formattedDate,
      orElse: () => {'name': 'Aucune bourse', 'message': 'Aucune information disponible.', 'imageUrl': ''},
    );

    // Vérifier si les paris sont ouverts
    bool isBettingOpen = now.hour >= 7 && now.hour < 18;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Paris - Star et Bourse du jour'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Star et Bourse du jour',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            Card(
              child: Column(
                children: [
                  if (todayStarInfo?['imageUrl'] != null && todayStarInfo!['imageUrl']!.isNotEmpty)
                    Image.network(todayStarInfo['imageUrl']!),
                  ListTile(
                    leading: const Icon(Icons.star, color: Colors.amber),
                    title: Text('Star du jour : ${todayStarInfo?['name']}'),
                    subtitle: Text(todayStarInfo?['message'] ?? ''),
                    trailing: isBettingOpen
                        ? ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const StarGameScreen(),
                                ),
                              );
                            },
                            child: const Text('Jouer'),
                          )
                        : null,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 10),
            Card(
              child: Column(
                children: [
                  if (todayBourseInfo?['imageUrl'] != null && todayBourseInfo!['imageUrl']!.isNotEmpty)
                    Image.network(todayBourseInfo['imageUrl']!),
                  ListTile(
                    leading: const Icon(Icons.business, color: Colors.blue),
                    title: Text('Bourse du jour : ${todayBourseInfo?['name']}'),
                    subtitle: Text(todayBourseInfo?['message'] ?? ''),
                    trailing: isBettingOpen
                        ? ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const BourseGameScreen(),
                                ),
                              );
                            },
                            child: const Text('Jouer'),
                          )
                        : null,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            if (!isBettingOpen)
              const Text(
                'Les paris sont fermés. Les résultats seront publiés demain à 7h.',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.red),
              ),
          ],
        ),
      ),
    );
  }
}

class StarGameScreen extends StatelessWidget {
  final List<int> starTurbanNumbers = const [23, 45, 67]; // Déclaration constante

  const StarGameScreen({Key? key}) : super(key: key); // Constructeur constant

  @override
  Widget build(BuildContext context) {
    final TextEditingController number1Controller = TextEditingController();
    final TextEditingController number2Controller = TextEditingController();
    final TextEditingController number3Controller = TextEditingController();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Star du jour'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text('Devinez les 3 chiffres des turbans de la star :'),
            TextField(
              controller: number1Controller,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Chiffre 1'),
            ),
            TextField(
              controller: number2Controller,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Chiffre 2'),
            ),
            TextField(
              controller: number3Controller,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Chiffre 3'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                final int guess1 = int.tryParse(number1Controller.text) ?? 0;
                final int guess2 = int.tryParse(number2Controller.text) ?? 0;
                final int guess3 = int.tryParse(number3Controller.text) ?? 0;

                final bool isWin = [guess1, guess2, guess3].toSet().containsAll(starTurbanNumbers);

                if (isWin) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Félicitations ! Vous avez gagné ! Votre mise est multipliée par 100 !'),
                    ),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Désolé, vous avez perdu votre mise.'),
                    ),
                  );
                }
              },
              child: const Text('Valider'),
            ),
          ],
        ),
      ),
    );
  }
}

class BourseGameScreen extends StatelessWidget {
  final List<int> bourseTurbanNumbers = const [12, 34, 56, 78]; // Déclaration constante

  const BourseGameScreen({Key? key}) : super(key: key); // Constructeur constant

  @override
  Widget build(BuildContext context) {
    final TextEditingController number1Controller = TextEditingController();
    final TextEditingController number2Controller = TextEditingController();
    final TextEditingController number3Controller = TextEditingController();
    final TextEditingController number4Controller = TextEditingController();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Bourse du jour'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text('Devinez les 4 chiffres des turbans de la bourse :'),
            TextField(
              controller: number1Controller,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Chiffre 1'),
            ),
            TextField(
              controller: number2Controller,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Chiffre 2'),
            ),
            TextField(
              controller: number3Controller,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Chiffre 3'),
            ),
            TextField(
              controller: number4Controller,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Chiffre 4'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                final int guess1 = int.tryParse(number1Controller.text) ?? 0;
                final int guess2 = int.tryParse(number2Controller.text) ?? 0;
                final int guess3 = int.tryParse(number3Controller.text) ?? 0;
                final int guess4 = int.tryParse(number4Controller.text) ?? 0;

                final List<int> guesses = [guess1, guess2, guess3, guess4];
                int matchingCount = guesses.where((guess) => bourseTurbanNumbers.contains(guess)).length;

                if (matchingCount == 4) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Félicitations ! Vous avez gagné ! Votre mise est multipliée par 1000 !'),
                    ),
                  );
                } else if (matchingCount == 3) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Félicitations ! Vous avez gagné ! Votre mise est multipliée par 10 !'),
                    ),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Désolé, vous avez perdu votre mise.'),
                    ),
                  );
                }
              },
              child: const Text('Valider'),
            ),
          ],
        ),
      ),
    );
  }
}