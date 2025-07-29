import { IBankDetailRepository } from '../../domain/interfaces/IBankDetailRepository';
import { CreateBankDetailDTO } from '../../shared/types';

export class CreateBankDetail {
  constructor(private bankDetailRepository: IBankDetailRepository) {}

  async execute(userId: string, bankDetailData: CreateBankDetailDTO): Promise<any> {
    const bankDetail = await this.bankDetailRepository.create({
      userId,
      ...bankDetailData
    });

    return {
      id: bankDetail.id,
      bankName: bankDetail.bankName,
      accountNumber: bankDetail.getMaskedAccountNumber(),
      routingNumber: bankDetail.routingNumber,
      accountType: bankDetail.accountType,
      createdAt: bankDetail.createdAt
    };
  }
}