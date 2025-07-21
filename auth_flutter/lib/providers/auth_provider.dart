import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user_model.dart';
import '../services/api_service.dart';
import '../services/google_auth_service.dart';

class AuthProvider with ChangeNotifier {
  UserModel? _user;
  bool _isLoading = false;
  String? _error;

  UserModel? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _user != null;

  Future<void> loadUser() async {
    _isLoading = true;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('accessToken');
      
      if (token != null) {
        _user = await ApiService.getProfile();
      }
    } catch (e) {
      await logout();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await ApiService.login(email, password);
      await _saveTokens(response['tokens']);
      _user = UserModel.fromJson(response['user']);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> register(String name, String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await ApiService.register(name, email, password);
      await _saveTokens(response['tokens']);
      _user = UserModel.fromJson(response['user']);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> googleSignIn() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final credential = await GoogleAuthService.signInWithGoogle();
      if (credential != null) {
        final response = await ApiService.googleAuth(credential);
        await _saveTokens(response['tokens']);
        _user = UserModel.fromJson(response['user']);
        _isLoading = false;
        notifyListeners();
        return true;
      }
      _isLoading = false;
      notifyListeners();
      return false;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('accessToken');
    await prefs.remove('refreshToken');
    await GoogleAuthService.signOut();
    _user = null;
    notifyListeners();
  }

  Future<void> _saveTokens(Map<String, dynamic> tokens) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('accessToken', tokens['accessToken']);
    await prefs.setString('refreshToken', tokens['refreshToken']);
  }
}