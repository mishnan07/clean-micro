const User = require('../models/User');
const { verifyGoogleToken } = require('../utils/googleAuth');
const { verifyAppleToken } = require('../utils/appleAuth');
const { generateTokens } = require('../utils/jwt');

// Google Login/Register
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

// Regular Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
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
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};

// Regular Register
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists'
      });
    }

    const user = new User({
      email,
      password,
      name,
      authProvider: 'local'
    });

    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
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
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
};

// Apple Login/Register
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

module.exports = {
  googleAuth,
  appleAuth,
  login,
  register
};