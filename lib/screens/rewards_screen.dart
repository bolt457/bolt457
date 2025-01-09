import 'package:flutter/material.dart';
import '../models/reward_model.dart';

class RewardsScreen extends StatelessWidget {
  const RewardsScreen({Key? key}) : super(key: key); // Constructeur constant

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Récompenses'), // Utilisation de const
      ),
      body: Center(
        child: const Text('Découvrez et réclamez vos récompenses ici.'), // Utilisation de const
      ),
    );
  }
}