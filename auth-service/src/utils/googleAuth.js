const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      profileImage: payload.picture,
      isEmailVerified: payload.email_verified
    };
  } catch (error) {
    throw new Error('Invalid Google token');
  }
};

module.exports = { verifyGoogleToken };