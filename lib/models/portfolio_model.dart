// lib/models/portfolio_model.dart
class Portfolio {
  final String portfolioId;
  final List<String> assets;
  final double totalValue;

  Portfolio({required this.portfolioId, required this.assets, required this.totalValue});
}
