import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';

class SocialLoginButtons extends StatelessWidget {
  const SocialLoginButtons({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    return Column(
      children: [
        // Google Sign-In Button
        OutlinedButton.icon(
          onPressed: authProvider.isLoading
              ? null
              : () async {
                  final success = await authProvider.signInWithGoogle();
                  if (success && context.mounted) {
                    Navigator.pushReplacementNamed(context, '/home');
                  } else if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(authProvider.error ?? 'Google sign-in failed'),
                      ),
                    );
                  }
                },
          style: OutlinedButton.styleFrom(
            padding: const EdgeInsets.symmetric(vertical: 12),
            side: const BorderSide(color: Colors.grey),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          icon: Image.network(
            'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
            height: 24,
          ),
          label: const Text('Sign in with Google'),
        ),
        const SizedBox(height: 16),
        // Apple Sign-In Button
        OutlinedButton.icon(
          onPressed: authProvider.isLoading
              ? null
              : () async {
                  final success = await authProvider.signInWithApple();
                  if (success && context.mounted) {
                    Navigator.pushReplacementNamed(context, '/home');
                  } else if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(authProvider.error ?? 'Apple sign-in failed'),
                      ),
                    );
                  }
                },
          style: OutlinedButton.styleFrom(
            padding: const EdgeInsets.symmetric(vertical: 12),
            backgroundColor: Colors.black,
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          icon: const Icon(Icons.apple, size: 24),
          label: const Text('Sign in with Apple'),
        ),
      ],
    );
  }
}