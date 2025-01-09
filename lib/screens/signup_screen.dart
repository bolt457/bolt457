import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'home_screen.dart'; // Importe la page d'accueil

class SignupScreen extends StatefulWidget {
  const SignupScreen({Key? key}) : super(key: key);

  @override
  _SignupScreenState createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  bool _isPasswordValid(String password) {
    return password.length >= 6; // Vérification de la longueur minimale
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Inscription'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(labelText: 'Email'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer votre email';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _passwordController,
                decoration: const InputDecoration(labelText: 'Mot de passe'),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer votre mot de passe';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _confirmPasswordController,
                decoration: const InputDecoration(labelText: 'Confirmer le mot de passe'),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez confirmer votre mot de passe';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  if (_formKey.currentState!.validate()) {
                    // Vérification des mots de passe
                    if (_passwordController.text != _confirmPasswordController.text) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Les mots de passe ne correspondent pas.')),
                      );
                      return;
                    }

                    if (!_isPasswordValid(_passwordController.text)) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Le mot de passe doit contenir au moins 6 caractères.')),
                      );
                      return;
                    }

                    try {
                      // Créer un nouvel utilisateur
                      UserCredential userCredential = await _auth.createUserWithEmailAndPassword(
                        email: _emailController.text,
                        password: _passwordController.text,
                      );

                      // Récupérer l'UID de l'utilisateur créé
                      String uid = userCredential.user!.uid;

                      // Ajouter l'utilisateur à Firestore avec un solde initial de 1 dollar
                      await _firestore.collection('users').doc(uid).set({
                        'balance': 1.0, // Solde initial de 1 dollar
                        'email': _emailController.text,
                        'africoins': 0.0, // Valeur initiale d'Africoins
                        'dollars': 0.0, // Valeur initiale de dollars
                      });

                      // Inscription réussie, afficher un message
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Inscription réussie !')),
                      );

                      // Naviguer vers la page d'accueil
                      Navigator.of(context).pushReplacement(
                        MaterialPageRoute(builder: (context) => const HomeScreen()),
                      );
                    } on FirebaseAuthException catch (e) {
                      // Gérer les erreurs
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text(e.message ?? 'Erreur inconnue')),
                      );
                    }
                  }
                },
                child: const Text('S\'inscrire'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}