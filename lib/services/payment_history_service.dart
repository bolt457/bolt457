class PaymentHistoryService {
  // Simule une base de données locale avec une liste
  final List<Map<String, dynamic>> _paymentHistory = [];

  // Ajouter un paiement à l'historique
  void addPayment(String method, double amount, String date) {
    _paymentHistory.add({
      'method': method,
      'amount': amount,
      'date': date,
    });
  }

  // Récupérer l'historique des paiements
  List<Map<String, dynamic>> getPaymentHistory() {
    return _paymentHistory;
  }
}
