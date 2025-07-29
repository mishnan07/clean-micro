import mongoose from 'mongoose';

export class Database {
  static async connect(): Promise<void> {
    try {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/secservice';
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1);
    }
  }

  static async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}