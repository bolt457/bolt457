import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'wallet_screen.dart'; // Assurez-vous d'importer wallet_screen.dart

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Connexion'),
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
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  if (_formKey.currentState!.validate()) {
                    try {
                      UserCredential userCredential = await _auth.signInWithEmailAndPassword(
                        email: _emailController.text,
                        password: _passwordController.text,
                      );

                      // Authentification réussie, redirige vers WalletScreen
                      Navigator.of(context).pushReplacement(
                        MaterialPageRoute(builder: (context) => const WalletScreen()),
                      );
                    } on FirebaseAuthException catch (e) {
                      String errorMessage;
                      switch (e.code) {
                        case 'user-not-found':
                          errorMessage = 'Aucun utilisateur trouvé pour cet email.';
                          break;
                        case 'wrong-password':
                          errorMessage = 'Mot de passe incorrect.';
                          break;
                        default:
                          errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
                          break;
                      }

                      // Gérer les erreurs
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text(errorMessage)),
                      );
                    }
                  }
                },
                child: const Text('Se connecter'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}