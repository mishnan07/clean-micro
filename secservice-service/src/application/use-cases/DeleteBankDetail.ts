import { IBankDetailRepository } from '../../domain/interfaces/IBankDetailRepository';

export class DeleteBankDetail {
  constructor(private bankDetailRepository: IBankDetailRepository) {}

  async execute(bankDetailId: string): Promise<boolean> {
    const deleted = await this.bankDetailRepository.delete(bankDetailId);
    if (!deleted) {
      throw new Error('Bank detail not found');
    }
    return deleted;
  }
}