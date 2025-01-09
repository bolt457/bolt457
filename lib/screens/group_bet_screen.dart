import 'package:flutter/material.dart';
import '../models/group_bet_model.dart';

class GroupBetScreen extends StatelessWidget {
  const GroupBetScreen({Key? key}) : super(key: key); // Constructeur constant

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Pari de Groupe'), // Utilisez const pour le texte
      ),
      body: Center(
        child: const Text('Créez et gérez vos paris de groupe ici.'), // Utilisez const ici aussi
      ),
    );
  }
}