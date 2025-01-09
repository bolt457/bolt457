import 'package:flutter/material.dart';

class TutorialsScreen extends StatelessWidget {
  const TutorialsScreen({Key? key}) : super(key: key); // Constructeur constant

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tutoriels'), // Utilisation de const
      ),
      body: Center(
        child: const Text('Apprenez comment maximiser vos gains ici.'), // Utilisation de const
      ),
    );
  }
}