const User = require('../models/User');
const { verifyAppleToken } = require('../utils/appleAuth');
const { generateTokens } = require('../utils/jwt');

/**
 * Handle Apple authentication (login/register)
 */
const appleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'Apple ID token is required'
      });
    }

    // Verify Apple token
    const appleUser = await verifyAppleToken(idToken);

    // Check if user exists
    let user = await User.findOne({ email: appleUser.email });

    if (user) {
      // User exists - login
      if (user.authProvider === 'local' || user.authProvider === 'google') {
        // Link Apple account to existing account
        user.appleId = appleUser.appleId;
        user.isEmailVerified = true;
        await user.save();
      }
    } else {
      // User doesn't exist - register
      user = new User({
        email: appleUser.email,
        name: appleUser.name,
        appleId: appleUser.appleId,
        isEmailVerified: appleUser.isEmailVerified,
        authProvider: 'apple'
      });
      await user.save();
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    res.status(200).json({
      success: true,
      message: 'Apple authentication successful',
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
    console.error('Apple auth error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Apple authentication failed'
    });
  }
};

module.exports = { appleAuth };