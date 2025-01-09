// lib/models/user_model.dart
import 'package:cloud_firestore/cloud_firestore.dart';

class UserModel {
  String uid;
  String email;
  double africoins;

  UserModel({required this.uid, required this.email, this.africoins = 0});

  // Convert a User object into a map object
  Map<String, dynamic> toMap() {
    return {
      'uid': uid,
      'email': email,
      'africoins': africoins,
    };
  }

  // Create a User object from a map object
  factory UserModel.fromMap(Map<String, dynamic> map) {
    return UserModel(
      uid: map['uid'],
      email: map['email'],
      africoins: map['africoins'],
    );
  }
}
