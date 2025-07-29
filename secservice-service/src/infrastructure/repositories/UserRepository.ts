import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserModel } from '../models/UserModel';

export class UserRepository implements IUserRepository {
  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const userDoc = new UserModel(userData);
    const savedUser = await userDoc.save();
    return new User(
      savedUser._id.toString(),
      savedUser.email,
      savedUser.password,
      savedUser.firstName,
      savedUser.lastName,
      savedUser.createdAt,
      savedUser.updatedAt
    );
  }

  async findById(id: string): Promise<User | null> {
    const userDoc = await UserModel.findById(id);
    if (!userDoc) return null;
    return new User(
      userDoc._id.toString(),
      userDoc.email,
      userDoc.password,
      userDoc.firstName,
      userDoc.lastName,
      userDoc.createdAt,
      userDoc.updatedAt
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return null;
    return new User(
      userDoc._id.toString(),
      userDoc.email,
      userDoc.password,
      userDoc.firstName,
      userDoc.lastName,
      userDoc.createdAt,
      userDoc.updatedAt
    );
  }

  async update(id: string, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User | null> {
    const userDoc = await UserModel.findByIdAndUpdate(id, userData, { new: true });
    if (!userDoc) return null;
    return new User(
      userDoc._id.toString(),
      userDoc.email,
      userDoc.password,
      userDoc.firstName,
      userDoc.lastName,
      userDoc.createdAt,
      userDoc.updatedAt
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return !!result;
  }
}