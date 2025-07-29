import { IUserRepository } from '../../domain/interfaces/IUserRepository';

export class GetUserProfile {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<any> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.getFullName(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}