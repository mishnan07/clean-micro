const User = require('../models/User');
const { verifyGoogleToken } = require('../utils/googleAuth');
const { generateTokens } = require('../utils/jwt');

/**
 * Handle Google authentication (login/register)
 */
const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential is required'
      });
    }

    // Verify Google token
    const googleUser = await verifyGoogleToken(credential);

    // Check if user exists
    let user = await User.findOne({ email: googleUser.email });

    if (user) {
      // User exists - login
      if (user.authProvider === 'local') {
        // Link Google account to existing local account
        user.googleId = googleUser.googleId;
        user.profileImage = googleUser.profileImage;
        user.isEmailVerified = true;
        await user.save();
      }
    } else {
      // User doesn't exist - register
      user = new User({
        email: googleUser.email,
        name: googleUser.name,
        googleId: googleUser.googleId,
        profileImage: googleUser.profileImage,
        isEmailVerified: googleUser.isEmailVerified,
        authProvider: 'google'
      });
      await user.save();
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    res.status(200).json({
      success: true,
      message: user.authProvider === 'google' ? 'Login successful' : 'Account linked successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
        isEmailVerified: user.isEmailVerified,
        authProvider: user.authProvider
      },
      tokens: {
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Google authentication failed'
    });
  }
};

module.exports = { googleAuth };