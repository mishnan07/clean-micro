import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';

import '../../../core/constants.dart';

import '../../../core/network/dio_helper.dart';
import 'models/auth_response.dart';
import 'models/user_model.dart';

class AuthService {
  static const _storage = FlutterSecureStorage();
  static final _googleSignIn = GoogleSignIn(
    clientId: AppConstants.googleClientId,
    scopes: ['email', 'profile'],
  );

  // Regular login
  static Future<AuthResponse> login(String email, String password) async {
    try {
      final response = await DioHelper.postData(
        path: '/auth/login',
        data: {
          'email': email,
          'password': password,
        },
      );

      final authResponse = AuthResponse.fromJson(response.data);
      
      if (authResponse.success && authResponse.tokens != null) {
        await _saveTokens(authResponse.tokens!);
      }
      
      return authResponse;
    } on DioException catch (e) {
      return AuthResponse(
        success: false,
        message: e.response?.data['message'] ?? 'Login failed',
      );
    } catch (e) {
      return AuthResponse(
        success: false,
        message: 'Login failed: $e',
      );
    }
  }

  // Register
  static Future<AuthResponse> register(String name, String email, String password) async {
    try {
      final response = await DioHelper.postData(
        path: '/auth/register',
        data: {
          'name': name,
          'email': email,
          'password': password,
        },
      );

      final authResponse = AuthResponse.fromJson(response.data);
      
      if (authResponse.success && authResponse.tokens != null) {
        await _saveTokens(authResponse.tokens!);
      }
      
      return authResponse;
    } on DioException catch (e) {
      return AuthResponse(
        success: false,
        message: e.response?.data['message'] ?? 'Registration failed',
      );
    } catch (e) {
      return AuthResponse(
        success: false,
        message: 'Registration failed: $e',
      );
    }
  }

  // Google Sign-In
  static Future<AuthResponse> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      if (googleUser == null) {
        return AuthResponse(
          success: false,
          message: 'Google sign-in cancelled',
        );
      }

      final GoogleSignInAuthentication googleAuth = await googleUser.authentication;
      final String? idToken = googleAuth.idToken;

      if (idToken == null) {
        return AuthResponse(
          success: false,
          message: 'Failed to get Google ID token',
        );
      }

      final response = await DioHelper.postData(
        path: '/auth/google',
        data: {
          'credential': idToken,
        },
      );

      final authResponse = AuthResponse.fromJson(response.data);
      
      if (authResponse.success && authResponse.tokens != null) {
        await _saveTokens(authResponse.tokens!);
      }
      
      return authResponse;
    } on DioException catch (e) {
      return AuthResponse(
        success: false,
        message: e.response?.data['message'] ?? 'Google authentication failed',
      );
    } catch (e) {
      return AuthResponse(
        success: false,
        message: 'Google authentication failed: $e',
      );
    }
  }

  // Apple Sign-In
  static Future<AuthResponse> signInWithApple() async {
    try {
      final credential = await SignInWithApple.getAppleIDCredential(
        scopes: [
          AppleIDAuthorizationScopes.email,
          AppleIDAuthorizationScopes.fullName,
        ],
      );

      if (credential.identityToken == null) {
        return AuthResponse(
          success: false,
          message: 'Failed to get Apple ID token',
        );
      }

      final response = await DioHelper.postData(
        path: '/auth/apple',
        data: {
          'idToken': credential.identityToken,
        },
      );

      final authResponse = AuthResponse.fromJson(response.data);
      
      if (authResponse.success && authResponse.tokens != null) {
        await _saveTokens(authResponse.tokens!);
      }
      
      return authResponse;
    } on DioException catch (e) {
      return AuthResponse(
        success: false,
        message: e.response?.data['message'] ?? 'Apple authentication failed',
      );
    } catch (e) {
      return AuthResponse(
        success: false,
        message: 'Apple authentication failed: $e',
      );
    }
  }

  // Get user profile
  static Future<UserModel?> getProfile() async {
    try {
      final response = await DioHelper.getData(path: '/auth/profile');
      
      if (response.statusCode == 200 && response.data['success'] == true) {
        return UserModel.fromJson(response.data['user']);
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  // Logout
  static Future<void> logout() async {
    await _googleSignIn.signOut();
    await _storage.delete(key: AppConstants.accessTokenKey);
    await _storage.delete(key: AppConstants.refreshTokenKey);
  }

  // Check if user is logged in
  static Future<bool> isLoggedIn() async {
    final token = await _storage.read(key: AppConstants.accessTokenKey);
    return token != null;
  }

  // Save tokens
  static Future<void> _saveTokens(AuthTokens tokens) async {
    await _storage.write(key: AppConstants.accessTokenKey, value: tokens.accessToken);
    await _storage.write(key: AppConstants.refreshTokenKey, value: tokens.refreshToken);
  }
}