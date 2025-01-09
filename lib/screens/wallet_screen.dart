import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/transaction_service.dart';
import 'dart:convert'; // Pour utiliser jsonDecode
import 'package:http/http.dart' as http; // Pour les requêtes HTTP

class WalletScreen extends StatelessWidget {
  const WalletScreen({Key? key}) : super(key: key);

  Future<Map<String, dynamic>> fetchUserData(String uid) async {
    try {
      final response = await http.get(Uri.parse('http://192.168.61.245:3000/api/user/$uid'));
      if (response.statusCode != 200) {
        throw Exception('Erreur lors de la récupération des données utilisateur');
      }
      return jsonDecode(response.body);
    } catch (error) {
      print('Erreur: $error');
      throw error; // Relancer l'erreur pour la gestion ultérieure
    }
  }

  @override
  Widget build(BuildContext context) {
    final TransactionService _transactionService = TransactionService();
    final User? user = FirebaseAuth.instance.currentUser;

    // Vérifiez si l'utilisateur est connecté
    if (user == null) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Portefeuille Africoins'),
        ),
        body: const Center(child: Text('Aucun utilisateur connecté.')),
      );
    }

    // Débogage : afficher l'UID de l'utilisateur
    print("User UID: ${user.uid}");

    return Scaffold(
      appBar: AppBar(
        title: const Text('Portefeuille Africoins'),
      ),
      body: StreamBuilder<DocumentSnapshot>(
        stream: FirebaseFirestore.instance.collection('users').doc(user.uid).snapshots(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          // Vérifie si le document existe
          if (!snapshot.hasData || !snapshot.data!.exists) {
            return const Center(child: Text('Aucun utilisateur trouvé.'));
          }

          // Vérifie que les données ne soient pas nulles
          var userData = snapshot.data!.data() as Map<String, dynamic>? ?? {};
          double africoins = userData['africoins'] ?? 0.0; // Valeur par défaut à 0
          double dollars = userData['dollars'] ?? 0.0; // Récupérer le solde en dollars

          // Débogage : afficher les données utilisateur
          print("User Data: $userData");

          // Récupérer les données de l'API
          fetchUserData(user.uid).then((apiUserData) {
            // Vous pouvez utiliser apiUserData ici
            print("API User Data: $apiUserData");
          }).catchError((error) {
            print("Erreur lors de la récupération des données API: $error");
          });

          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Africoins: $africoins', style: const TextStyle(fontSize: 24)),
                Text('Dollars: $dollars', style: const TextStyle(fontSize: 24)),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () async {
                    try {
                      await _transactionService.buyAfricoins(user.uid, 10.0);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text("Achat réussi!")),
                      );
                    } catch (e) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text("Erreur: ${e.toString()}")),
                      );
                    }
                  },
                  child: const Text('Acheter 10 Africoins'),
                ),
                ElevatedButton(
                  onPressed: () async {
                    try {
                      await _transactionService.withdrawAfricoins(user.uid, 5.0);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text("Retrait réussi!")),
                      );
                    } catch (e) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text("Erreur: ${e.toString()}")),
                      );
                    }
                  },
                  child: const Text('Retirer 5 Africoins'),
                ),
                ElevatedButton(
                  onPressed: () async {
                    try {
                      await _transactionService.addDollars(user.uid, 50.0);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text("50 dollars ajoutés avec succès !")),
                      );
                    } catch (e) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text("Erreur: ${e.toString()}")),
                      );
                    }
                  },
                  child: const Text('Ajouter 50 Dollars'),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}