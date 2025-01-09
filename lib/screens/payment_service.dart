import 'dart:convert';
import 'package:http/http.dart' as http;

class PaymentService {
    static const String baseUrl = 'http://<ton-ip>:5000/api/payment';

    Future<bool> processPayment(String mobileNumber, double amount, String cardNumber) async {
        final url = Uri.parse('$baseUrl/process-payment');

        final response = await http.post(
          url,
          headers: {'Content-Type': 'application/json'},
          body: json.encode({
            'mobileNumber': mobileNumber,
            'amount': amount,
            'cardNumber': cardNumber,
          }),
        );

        if (response.statusCode == 200) {
            return true;
        } else {
            return false;
        }
    }
}
