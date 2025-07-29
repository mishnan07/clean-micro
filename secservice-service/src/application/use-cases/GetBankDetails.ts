import { IBankDetailRepository } from '../../domain/interfaces/IBankDetailRepository';

export class GetBankDetails {
  constructor(private bankDetailRepository: IBankDetailRepository) {}

  async execute(userId: string): Promise<any[]> {
    const bankDetails = await this.bankDetailRepository.findByUserId(userId);
    
    return bankDetails.map(bankDetail => ({
      id: bankDetail.id,
      bankName: bankDetail.bankName,
      accountNumber: bankDetail.getMaskedAccountNumber(),
      routingNumber: bankDetail.routingNumber,
      accountType: bankDetail.accountType,
      createdAt: bankDetail.createdAt,
      updatedAt: bankDetail.updatedAt
    }));
  }
}