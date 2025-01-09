import 'package:flutter/material.dart';
import '../models/portfolio_model.dart';

class PortfolioScreen extends StatelessWidget {
  const PortfolioScreen({Key? key}) : super(key: key); // Constructeur constant

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Suivi des Portefeuilles'), // Utilisation de const
      ),
      body: Center(
        child: const Text('Suivez la performance de vos investissements ici.'), // Utilisation de const
      ),
    );
  }
}