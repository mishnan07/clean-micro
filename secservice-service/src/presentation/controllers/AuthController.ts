import { Request, Response } from 'express';
import { CreateUser } from '../../application/use-cases/CreateUser';
import { LoginUser } from '../../application/use-cases/LoginUser';
import { GetUserProfile } from '../../application/use-cases/GetUserProfile';
import { UpdateUserProfile } from '../../application/use-cases/UpdateUserProfile';
import { asyncHandler } from '../../shared/utils/asyncHandler';

export class AuthController {
  constructor(
    private createUser: CreateUser,
    private loginUser: LoginUser,
    private getUserProfile: GetUserProfile,
    private updateUserProfile: UpdateUserProfile
  ) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.createUser.execute(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.loginUser.execute(req.body);
    res.json({
      success: true,
      message: 'Login successful',
      data: result
    });
  });

  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const profile = await this.getUserProfile.execute(req.user!.userId);
    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: profile
    });
  });

  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const updatedProfile = await this.updateUserProfile.execute(req.user!.userId, req.body);
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile
    });
  });
}