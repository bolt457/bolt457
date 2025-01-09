import 'package:flutter/material.dart';
import 'payment_service.dart';
import '../services/payment_history_service.dart';

class PaymentScreen extends StatefulWidget {
  const PaymentScreen({Key? key}) : super(key: key); // Constructeur constant

  @override
  _PaymentScreenState createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  final _mobileController = TextEditingController();
  final _amountController = TextEditingController();
  final _cardController = TextEditingController();

  void _submitPayment() async {
    final mobileNumber = _mobileController.text;
    final amount = double.tryParse(_amountController.text) ?? 0;
    final cardNumber = _cardController.text;

    final paymentService = PaymentService();
    final success = await paymentService.processPayment(mobileNumber, amount, cardNumber);

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Paiement réussi')));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Erreur de paiement')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Paiement')), // Utilisation de const
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(controller: _mobileController, decoration: const InputDecoration(labelText: 'Numéro Mobile')),
            TextField(
              controller: _amountController,
              decoration: const InputDecoration(labelText: 'Montant'),
              keyboardType: TextInputType.number,
            ),
            TextField(controller: _cardController, decoration: const InputDecoration(labelText: 'Numéro Carte Visa')),
            ElevatedButton(onPressed: _submitPayment, child: const Text('Payer')), // Utilisation de const
          ],
        ),
      ),
    );
  }
}