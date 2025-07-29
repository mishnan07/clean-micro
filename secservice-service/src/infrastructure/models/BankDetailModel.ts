import mongoose, { Schema, Document } from 'mongoose';

export interface IBankDetailDocument extends Document {
  userId: mongoose.Types.ObjectId;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
  createdAt: Date;
  updatedAt: Date;
}

const bankDetailSchema = new Schema<IBankDetailDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  routingNumber: { type: String, required: true },
  accountType: { type: String, enum: ['checking', 'savings'], required: true }
}, {
  timestamps: true
});

export const BankDetailModel = mongoose.model<IBankDetailDocument>('BankDetail', bankDetailSchema);