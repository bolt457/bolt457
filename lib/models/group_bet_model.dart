// lib/models/group_bet_model.dart
class GroupBet {
  final String groupId;
  final List<String> members;
  final double betAmount;
  final String event;

  GroupBet({required this.groupId, required this.members, required this.betAmount, required this.event});
}
