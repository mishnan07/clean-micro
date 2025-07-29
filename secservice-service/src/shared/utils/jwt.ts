import jwt from 'jsonwebtoken';
import { AuthPayload } from '../types';

export class JWTUtil {
  private static secret = process.env.JWT_SECRET || 'default-secret';
  private static expiresIn = process.env.JWT_EXPIRES_IN || '24h';

  static generateToken(payload: AuthPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  static verifyToken(token: string): AuthPayload {
    return jwt.verify(token, this.secret) as AuthPayload;
  }
}