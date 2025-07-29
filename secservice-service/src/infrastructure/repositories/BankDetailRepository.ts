import { IBankDetailRepository } from '../../domain/interfaces/IBankDetailRepository';
import { BankDetail } from '../../domain/entities/BankDetail';
import { BankDetailModel } from '../models/BankDetailModel';

export class BankDetailRepository implements IBankDetailRepository {
  async create(bankDetailData: Omit<BankDetail, 'id' | 'createdAt' | 'updatedAt'>): Promise<BankDetail> {
    const bankDetailDoc = new BankDetailModel(bankDetailData);
    const savedBankDetail = await bankDetailDoc.save();
    return new BankDetail(
      savedBankDetail._id.toString(),
      savedBankDetail.userId.toString(),
      savedBankDetail.bankName,
      savedBankDetail.accountNumber,
      savedBankDetail.routingNumber,
      savedBankDetail.accountType,
      savedBankDetail.createdAt,
      savedBankDetail.updatedAt
    );
  }

  async findById(id: string): Promise<BankDetail | null> {
    const bankDetailDoc = await BankDetailModel.findById(id);
    if (!bankDetailDoc) return null;
    return new BankDetail(
      bankDetailDoc._id.toString(),
      bankDetailDoc.userId.toString(),
      bankDetailDoc.bankName,
      bankDetailDoc.accountNumber,
      bankDetailDoc.routingNumber,
      bankDetailDoc.accountType,
      bankDetailDoc.createdAt,
      bankDetailDoc.updatedAt
    );
  }

  async findByUserId(userId: string): Promise<BankDetail[]> {
    const bankDetailDocs = await BankDetailModel.find({ userId });
    return bankDetailDocs.map(doc => new BankDetail(
      doc._id.toString(),
      doc.userId.toString(),
      doc.bankName,
      doc.accountNumber,
      doc.routingNumber,
      doc.accountType,
      doc.createdAt,
      doc.updatedAt
    ));
  }

  async update(id: string, bankDetailData: Partial<Omit<BankDetail, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<BankDetail | null> {
    const bankDetailDoc = await BankDetailModel.findByIdAndUpdate(id, bankDetailData, { new: true });
    if (!bankDetailDoc) return null;
    return new BankDetail(
      bankDetailDoc._id.toString(),
      bankDetailDoc.userId.toString(),
      bankDetailDoc.bankName,
      bankDetailDoc.accountNumber,
      bankDetailDoc.routingNumber,
      bankDetailDoc.accountType,
      bankDetailDoc.createdAt,
      bankDetailDoc.updatedAt
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await BankDetailModel.findByIdAndDelete(id);
    return !!result;
  }
}