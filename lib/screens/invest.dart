import 'package:flutter/material.dart';

class InvestScreen extends StatelessWidget {
  const InvestScreen({Key? key}) : super(key: key); // Constructeur constant

  // Déclaration de la liste comme constante
  final List<Map<String, String>> companies = const [
    {
      'name': 'Entreprise A',
      'description': 'Description de l\'Entreprise A',
      'documentUrl': 'https://example.com/document_a'
    },
    {
      'name': 'Entreprise B',
      'description': 'Description de l\'Entreprise B',
      'documentUrl': 'https://example.com/document_b'
    },
    // Ajoutez d'autres entreprises ici
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Investissements'), // Utilisation de const
      ),
      body: ListView.builder(
        itemCount: companies.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(companies[index]['name']!),
            subtitle: Text(companies[index]['description']!),
            trailing: ElevatedButton(
              onPressed: () {
                // Ouvrir le document pour voir plus de détails
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => DocumentScreen(
                      documentUrl: companies[index]['documentUrl']!,
                    ),
                  ),
                );
              },
              child: const Text('Voir Document'), // Utilisation de const
            ),
          );
        },
      ),
    );
  }
}

class DocumentScreen extends StatelessWidget {
  final String documentUrl;

  const DocumentScreen({Key? key, required this.documentUrl}) : super(key: key); // Constructeur constant

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Document Entreprise'), // Utilisation de const
      ),
      body: Center(
        child: Text('Document disponible à : $documentUrl'),
      ),
    );
  }
}