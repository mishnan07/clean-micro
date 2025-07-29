import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { LoginDTO } from '../../shared/types';
import { PasswordUtil } from '../../shared/utils/password';
import { JWTUtil } from '../../shared/utils/jwt';

export class LoginUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(loginData: LoginDTO): Promise<{ user: any; token: string }> {
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await PasswordUtil.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = JWTUtil.generateToken({
      userId: user.id,
      email: user.email
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      token
    };
  }
}