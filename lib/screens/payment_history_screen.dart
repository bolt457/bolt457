import 'package:flutter/material.dart';

class PaymentHistoryScreen extends StatelessWidget {
  final List<Map<String, dynamic>> paymentHistory;

  PaymentHistoryScreen({Key? key, required this.paymentHistory}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Historique des paiements'),
      ),
      body: paymentHistory.isEmpty
          ? Center(
              child: Text(
                'Aucun paiement enregistré.',
                style: TextStyle(fontSize: 18, color: Colors.grey),
              ),
            )
          : ListView.builder(
              itemCount: paymentHistory.length,
              itemBuilder: (context, index) {
                final payment = paymentHistory[index];
                return ListTile(
                  title: Text('Paiement de ${payment['amount']} USD'),
                  subtitle: Text('Méthode : ${payment['method']}'),
                  trailing: Text(payment['date']),
                  leading: Icon(Icons.payment, color: Colors.green),
                );
              },
            ),
    );
  }
}
