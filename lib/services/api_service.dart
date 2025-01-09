import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl = "http://localhost:3000/api"; // Remplacez localhost par l'IP de votre backend

  // Dépôt
  Future<Map<String, dynamic>> deposit(int userId, double amount) async {
    final response = await http.post(
      Uri.parse('$baseUrl/transactions/deposit'),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"userId": userId, "amount": amount}),
    );
    return _handleResponse(response);
  }

  // Retrait
  Future<Map<String, dynamic>> withdraw(int userId, double amount) async {
    final response = await http.post(
      Uri.parse('$baseUrl/transactions/withdraw'),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"userId": userId, "amount": amount}),
    );
    return _handleResponse(response);
  }

  // Obtenir le solde
  Future<Map<String, dynamic>> getBalance(int userId) async {
    final response = await http.get(
      Uri.parse('$baseUrl/users/$userId/balance'),
    );
    return _handleResponse(response);
  }

  // Gestion des réponses
  Map<String, dynamic> _handleResponse(http.Response response) {
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Erreur : ${response.statusCode} - ${response.body}');
    }
  }
}