const appleSignin = require('apple-signin-auth');
const fs = require('fs');

const verifyAppleToken = async (idToken) => {
  try {
    const appleIdTokenClaims = await appleSignin.verifyIdToken(idToken, {
      audience: process.env.APPLE_CLIENT_ID,
      ignoreExpiration: false,
    });

    return {
      appleId: appleIdTokenClaims.sub,
      email: appleIdTokenClaims.email,
      name: appleIdTokenClaims.name || 'Apple User',
      isEmailVerified: appleIdTokenClaims.email_verified !== 'false'
    };
  } catch (error) {
    throw new Error('Invalid Apple token');
  }
};

module.exports = { verifyAppleToken };