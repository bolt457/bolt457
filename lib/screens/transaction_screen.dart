import 'package:flutter/material.dart';
import '../models/transaction_service.dart';

class TransactionScreen extends StatefulWidget {
  final String userId; // Passez l'ID utilisateur depuis l'écran principal

  const TransactionScreen({Key? key, required this.userId}) : super(key: key);

  @override
  _TransactionScreenState createState() => _TransactionScreenState();
}

class _TransactionScreenState extends State<TransactionScreen> {
  final TransactionService transactionService = TransactionService();
  double balance = 0.0;
  final TextEditingController amountController = TextEditingController();

  // Fetch le solde initial
  void fetchBalance() async {
    try {
      final userBalance = await transactionService.getBalance(widget.userId);
      setState(() {
        balance = userBalance;
      });
    } catch (e) {
      print(e);
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erreur: ${e.toString()}")));
    }
  }

  // Fonction pour déposer des Africoins
  void makeDeposit() async {
    try {
      double amount = double.parse(amountController.text);
      await transactionService.buyAfricoins(widget.userId, amount);
      fetchBalance();
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Dépôt réussi!")));
    } catch (e) {
      print(e);
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erreur: ${e.toString()}")));
    }
  }

  // Fonction pour retirer des Africoins
  void makeWithdraw() async {
    try {
      double amount = double.parse(amountController.text);
      await transactionService.withdrawAfricoins(widget.userId, amount);
      fetchBalance();
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Retrait réussi!")));
    } catch (e) {
      print(e);
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erreur: ${e.toString()}")));
    }
  }

  @override
  void initState() {
    super.initState();
    fetchBalance();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Transactions")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text("Solde Africoins : \$${balance.toStringAsFixed(2)}"),
            TextField(
              controller: amountController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: "Montant"),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(onPressed: makeDeposit, child: const Text("Déposer")),
                ElevatedButton(onPressed: makeWithdraw, child: const Text("Retirer")),
              ],
            ),
          ],
        ),
      ),
    );
  }
}