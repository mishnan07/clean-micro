import { IBankDetailRepository } from '../../domain/interfaces/IBankDetailRepository';
import { UpdateBankDetailDTO } from '../../shared/types';

export class UpdateBankDetail {
  constructor(private bankDetailRepository: IBankDetailRepository) {}

  async execute(bankDetailId: string, updateData: UpdateBankDetailDTO): Promise<any> {
    const updatedBankDetail = await this.bankDetailRepository.update(bankDetailId, updateData);
    if (!updatedBankDetail) {
      throw new Error('Bank detail not found');
    }

    return {
      id: updatedBankDetail.id,
      bankName: updatedBankDetail.bankName,
      accountNumber: updatedBankDetail.getMaskedAccountNumber(),
      routingNumber: updatedBankDetail.routingNumber,
      accountType: updatedBankDetail.accountType,
      updatedAt: updatedBankDetail.updatedAt
    };
  }
}