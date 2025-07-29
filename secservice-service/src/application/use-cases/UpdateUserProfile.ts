import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { UpdateUserDTO } from '../../shared/types';

export class UpdateUserProfile {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string, updateData: UpdateUserDTO): Promise<any> {
    const updatedUser = await this.userRepository.update(userId, updateData);
    if (!updatedUser) {
      throw new Error('User not found');
    }

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      fullName: updatedUser.getFullName(),
      updatedAt: updatedUser.updatedAt
    };
  }
}