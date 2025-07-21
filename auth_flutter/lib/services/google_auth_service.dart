import 'package:google_sign_in/google_sign_in.dart';

class GoogleAuthService {
  static final GoogleSignIn _googleSignIn = GoogleSignIn(
    clientId: '651288837156-fpcpbqdot3e540raueo1ifi9mmvise4k.apps.googleusercontent.com',
    scopes: ['email', 'profile'],
  );

  static Future<String?> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? account = await _googleSignIn.signIn();
      if (account != null) {
        final GoogleSignInAuthentication auth = await account.authentication;
        return auth.idToken;
      }
      return null;
    } catch (error) {
      print('Google Sign-In Error: $error');
      return null;
    }
  }

  static Future<void> signOut() async {
    await _googleSignIn.signOut();
  }

  static Future<bool> isSignedIn() async {
    return await _googleSignIn.isSignedIn();
  }
}