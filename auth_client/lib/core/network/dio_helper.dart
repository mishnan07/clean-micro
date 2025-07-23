import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../constants.dart';

class DioHelper {
  static Dio? _dio;
  static const String _baseUrl = AppConstants.baseUrl;
  static const _storage = FlutterSecureStorage();

  static Future<Dio> getDio() async {
    if (_dio == null) {
      _dio = Dio(
        BaseOptions(
          baseUrl: _baseUrl,
          connectTimeout: const Duration(seconds: 30),
          receiveTimeout: const Duration(seconds: 30),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        ),
      );

      // Add interceptor for authentication
      _dio!.interceptors.add(
        InterceptorsWrapper(
          onRequest: (options, handler) async {
            final token = await _storage.read(key: AppConstants.accessTokenKey);
            if (token != null) {
              options.headers['Authorization'] = 'Bearer $token';
            }
            return handler.next(options);
          },
          onError: (DioException error, handler) async {
            if (error.response?.statusCode == 401) {
              // Token expired, try to refresh
              final refreshToken = await _storage.read(key: AppConstants.refreshTokenKey);
              if (refreshToken != null) {
                try {
                  // Implement token refresh logic here
                  // For now, just logout on 401
                  await _storage.delete(key: 'accessToken');
                  await _storage.delete(key: 'refreshToken');
                } catch (e) {
                  // Refresh failed, logout
                  await _storage.delete(key: 'accessToken');
                  await _storage.delete(key: 'refreshToken');
                }
              }
            }
            return handler.next(error);
          },
        ),
      );
    }
    return _dio!;
  }

  // GET request
  static Future<Response> getData({
    required String path,
    Map<String, dynamic>? queryParameters,
  }) async {
    final dio = await getDio();
    return await dio.get(
      path,
      queryParameters: queryParameters,
    );
  }

  // POST request
  static Future<Response> postData({
    required String path,
    required Map<String, dynamic> data,
    Map<String, dynamic>? queryParameters,
  }) async {
    final dio = await getDio();
    return await dio.post(
      path,
      data: data,
      queryParameters: queryParameters,
    );
  }
}