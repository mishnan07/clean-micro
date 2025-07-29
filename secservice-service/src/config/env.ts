import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3004,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/secservice',
  jwtSecret: process.env.JWT_SECRET || 'default-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  nodeEnv: process.env.NODE_ENV || 'development'
};