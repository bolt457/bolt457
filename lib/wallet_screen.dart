import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class WalletScreen extends StatefulWidget {
  const WalletScreen({Key? key}) : super(key: key);

  @override
  _WalletScreenState createState() => _WalletScreenState();
}

class _WalletScreenState extends State<WalletScreen> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  int _balance = 0;
  double _dollarBalance = 0.0;
  String? _selectedPaymentMethod;
  final TextEditingController _mobileMoneyNumberController = TextEditingController();
  final TextEditingController _coinAmountController = TextEditingController();

  static const double africoinsToDollars = 0.04;
  double _calculatedCost = 0.0;
  int _purchasedAfricoins = 0;

  @override
  void initState() {
    super.initState();
    _loadBalance();
  }

  Future<void> _loadBalance() async {
    User? user = _auth.currentUser;
    if (user != null) {
      DocumentSnapshot userDoc = await _firestore.collection('users').doc(user.uid).get();
      if (userDoc.exists) {
        setState(() {
          _balance = userDoc['balance'];
          _dollarBalance = _balance * africoinsToDollars;
        });
      }
    }
  }

  Future<void> _buyAfricoins(int amount) async {
    User? user = _auth.currentUser;
    if (user != null) {
      DocumentReference userRef = _firestore.collection('users').doc(user.uid);
      DocumentSnapshot userDoc = await userRef.get();
      int currentBalance = userDoc['balance'];

      if (currentBalance >= amount) {
        await userRef.update({
          'balance': FieldValue.increment(-amount),
        });
        await _loadBalance();

        setState(() {
          _purchasedAfricoins += amount;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Achat réussi !')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Fonds insuffisants pour effectuer l\'achat.')),
        );
      }
    }
  }

  void _calculateCost() {
    try {
      int amountToBuy = int.parse(_coinAmountController.text);
      double costInDollars = amountToBuy * africoinsToDollars;
      setState(() {
        _calculatedCost = costInDollars;
      });
    } catch (e) {
      setState(() {
        _calculatedCost = 0.0;
      });
    }
  }

  bool _isValidMobileMoneyNumber() {
    String mobileNumber = _mobileMoneyNumberController.text;
    return RegExp(r'^\d{10}$').hasMatch(mobileNumber);
  }

  bool _isPaymentInfoValid() {
    if (_selectedPaymentMethod == 'Mobile Money') {
      return _isValidMobileMoneyNumber();
    }
    return false;
  }

  Future<void> _processPayment() async {
    try {
      if (!_isPaymentInfoValid()) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Informations de paiement invalides.')),
        );
        return;
      }

      int amountToBuy = int.parse(_coinAmountController.text);
      double costInDollars = amountToBuy * africoinsToDollars;

      if (_dollarBalance >= costInDollars) {
        await _buyAfricoins(amountToBuy);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Fonds insuffisants pour effectuer l\'achat.')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur: ${e.toString()}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Portefeuille Africoins'),
        actions: [
          IconButton(
            icon: const Icon(Icons.history),
            onPressed: () {
              Navigator.pushNamed(context, '/payment_history');
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Votre solde Africoins:',
              style: TextStyle(fontSize: 20),
            ),
            const SizedBox(height: 10),
            Text(
              '$_balance Africoins',
              style: const TextStyle(fontSize: 40, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            Text(
              'Solde en dollars: \$${_dollarBalance.toStringAsFixed(2)}',
              style: const TextStyle(fontSize: 20),
            ),
            const SizedBox(height: 20),
            Text(
              'Africoins achetés: $_purchasedAfricoins',
              style: const TextStyle(fontSize: 20),
            ),
            const SizedBox(height: 20),
            DropdownButton<String>(
              hint: const Text('Choisissez un moyen de paiement'),
              value: _selectedPaymentMethod,
              onChanged: (String? newValue) {
                setState(() {
                  _selectedPaymentMethod = newValue;
                });
              },
              items: <String>['Mobile Money']
                  .map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(value: value, child: Text(value));
              }).toList(),
            ),
            const SizedBox(height: 20),
            if (_selectedPaymentMethod == 'Mobile Money') ...[
              TextField(
                controller: _mobileMoneyNumberController,
                decoration: const InputDecoration(
                  labelText: 'Numéro de téléphone Mobile Money',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.phone,
              ),
            ],
            const SizedBox(height: 20),
            TextField(
              controller: _coinAmountController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Montant en Africoins',
                border: OutlineInputBorder(),
              ),
              onChanged: (text) {
                _calculateCost();
              },
            ),
            const SizedBox(height: 20),
            Text(
              'Coût estimé: \$${_calculatedCost.toStringAsFixed(2)}',
              style: const TextStyle(fontSize: 20),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _processPayment,
              child: const Text('Acheter des Africoins'),
            ),
          ],
        ),
      ),
    );
  }
}
