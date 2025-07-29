import { Request, Response } from 'express';
import { CreateBankDetail } from '../../application/use-cases/CreateBankDetail';
import { GetBankDetails } from '../../application/use-cases/GetBankDetails';
import { UpdateBankDetail } from '../../application/use-cases/UpdateBankDetail';
import { DeleteBankDetail } from '../../application/use-cases/DeleteBankDetail';
import { asyncHandler } from '../../shared/utils/asyncHandler';

export class BankDetailController {
  constructor(
    private createBankDetail: CreateBankDetail,
    private getBankDetails: GetBankDetails,
    private updateBankDetail: UpdateBankDetail,
    private deleteBankDetail: DeleteBankDetail
  ) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const bankDetail = await this.createBankDetail.execute(req.user!.userId, req.body);
    res.status(201).json({
      success: true,
      message: 'Bank detail created successfully',
      data: bankDetail
    });
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const bankDetails = await this.getBankDetails.execute(req.user!.userId);
    res.json({
      success: true,
      message: 'Bank details retrieved successfully',
      data: bankDetails
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const updatedBankDetail = await this.updateBankDetail.execute(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Bank detail updated successfully',
      data: updatedBankDetail
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await this.deleteBankDetail.execute(req.params.id);
    res.json({
      success: true,
      message: 'Bank detail deleted successfully'
    });
  });
}