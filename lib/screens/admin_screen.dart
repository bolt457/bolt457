import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class AdminScreen extends StatefulWidget {
  const AdminScreen({Key? key}) : super(key: key); // Ajout du constructeur const

  @override
  _AdminScreenState createState() => _AdminScreenState();
}

class _AdminScreenState extends State<AdminScreen> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  final TextEditingController _userIdController = TextEditingController();
  final TextEditingController _amountController = TextEditingController();
  final TextEditingController _codeController = TextEditingController();
  final TextEditingController _searchController = TextEditingController();

  final String uniqueCode = 'W3S4RwzXmLyK29C33(@';
  
  List<Map<String, dynamic>> _users = [];
  List<Map<String, dynamic>> _filteredUsers = [];

  @override
  void initState() {
    super.initState();
    _fetchAllUsers(); // Charger tous les utilisateurs au démarrage
  }

  Future<void> _fetchAllUsers() async {
    try {
      QuerySnapshot snapshot = await _firestore.collection('users').get();
      setState(() {
        _users = snapshot.docs.map((doc) {
          return {
            'id': doc.id,
            'name': doc['name'],
            'email': doc['email'],
            'balance': doc['balance'],
          };
        }).toList();
        _filteredUsers = _users; // Par défaut, tous les utilisateurs sont affichés
      });
    } catch (e) {
      print(e);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Erreur lors de la récupération des utilisateurs : ${e.toString()}")),
      );
    }
  }

  void _filterUsers(String query) {
    setState(() {
      if (query.isEmpty) {
        _filteredUsers = _users;
      } else {
        _filteredUsers = _users.where((user) {
          final name = user['name'].toLowerCase();
          final email = user['email'].toLowerCase();
          return name.contains(query.toLowerCase()) || email.contains(query.toLowerCase());
        }).toList();
      }
    });
  }

  Future<void> _addFunds(String userId, int amount) async {
    DocumentReference userRef = _firestore.collection('users').doc(userId);
    await userRef.update({
      'balance': FieldValue.increment(amount),
    });
    await _fetchAllUsers(); // Recharger la liste des utilisateurs après mise à jour
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin - Ajouter des fonds'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              TextField(
                controller: _searchController,
                onChanged: _filterUsers,
                decoration: const InputDecoration(
                  labelText: 'Rechercher par nom ou email',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20),
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _filteredUsers.length,
                itemBuilder: (context, index) {
                  final user = _filteredUsers[index];
                  return ListTile(
                    title: Text(user['name']),
                    subtitle: Text(user['email']),
                    trailing: Text('Solde : \$${user['balance']}'),
                    onTap: () {
                      _userIdController.text = user['id']; // Remplir automatiquement l'ID utilisateur
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Utilisateur sélectionné : ${user['name']}')),
                      );
                    },
                  );
                },
              ),
              const SizedBox(height: 20),
              TextField(
                controller: _userIdController,
                decoration: const InputDecoration(
                  labelText: 'User ID',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 10),
              TextField(
                controller: _amountController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Montant (en dollars)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 10),
              TextField(
                controller: _codeController,
                decoration: const InputDecoration(
                  labelText: 'Code Unique',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  String userId = _userIdController.text;
                  if (userId.isEmpty) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Veuillez sélectionner un utilisateur.')),
                    );
                    return;
                  }
                  if (_amountController.text.isEmpty) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Veuillez entrer un montant.')),
                    );
                    return;
                  }
                  int amount = int.parse(_amountController.text);
                  String enteredCode = _codeController.text;

                  if (enteredCode == uniqueCode) {
                    await _addFunds(userId, amount);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Fonds ajoutés avec succès!')),
                    );
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Code unique incorrect.')),
                    );
                  }
                },
                child: const Text('Ajouter des fonds'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}