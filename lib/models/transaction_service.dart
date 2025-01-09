class TransactionService {
  double _balance = 100.0; // Solde initial

  // Récupérer le solde
  Future<double> getBalance(String userId) async {
    return _balance;
  }

  // Acheter des Africoins
  Future<void> buyAfricoins(String userId, double amount) async {
    if (amount <= 0) {
      throw Exception("Le montant doit être supérieur à zéro.");
    }
    _balance += amount; // Ajout des Africoins
  }

  // Retirer des Africoins
  Future<void> withdrawAfricoins(String userId, double amount) async {
    if (amount <= 0) {
      throw Exception("Le montant doit être supérieur à zéro.");
    }
    if (amount > _balance) {
      throw Exception("Fonds insuffisants.");
    }
    _balance -= amount; // Retrait des Africoins
  }

  // Ajouter des dollars au solde
  Future<void> addDollars(String userId, double amount) async {
    if (amount <= 0) {
      throw Exception("Le montant doit être supérieur à zéro.");
    }
    _balance += amount; // Ajout de dollars au solde
  }
}