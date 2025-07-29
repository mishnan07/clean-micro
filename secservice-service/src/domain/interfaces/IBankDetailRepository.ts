import { BankDetail } from '../entities/BankDetail';

export interface IBankDetailRepository {
  create(bankDetailData: Omit<BankDetail, 'id' | 'createdAt' | 'updatedAt'>): Promise<BankDetail>;
  findById(id: string): Promise<BankDetail | null>;
  findByUserId(userId: string): Promise<BankDetail[]>;
  update(id: string, bankDetailData: Partial<Omit<BankDetail, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<BankDetail | null>;
  delete(id: string): Promise<boolean>;
}