import { UserModel, IUser } from "../models/user.model";

export interface CreateUserDto {
  name: string;
  phoneNumber: string;
  address: string;
}

export class UserService {
  static async createUser(data: CreateUserDto): Promise<IUser> {
    const user = new UserModel(data);
    return user.save();
  }

  static async findByPhoneNumber(phoneNumber: string): Promise<IUser | null> {
    return UserModel.findOne({ phoneNumber });
  }

  static async removeByPhoneNumber(
    phoneNumber: string
  ): Promise<{ deleted: boolean }> {
    const result = await UserModel.deleteOne({ phoneNumber });
    return { deleted: result.deletedCount !== 0 };
  }
}
