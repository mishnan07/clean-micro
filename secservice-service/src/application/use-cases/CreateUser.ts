import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';
import { CreateUserDTO } from '../../shared/types';
import { PasswordUtil } from '../../shared/utils/password';

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await PasswordUtil.hash(userData.password);
    
    return this.userRepository.create({
      ...userData,
      password: hashedPassword
    });
  }
}