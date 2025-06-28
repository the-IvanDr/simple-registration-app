import { UserModel, IUser } from "../models/user.model";
import { BlockedNumbersService } from "./blocked-numbers.service";

export interface CreateUserDto {
  name: string;
  phoneNumber: string;
  address: string;
}

export class UserService {
  static async createUser(data: CreateUserDto): Promise<IUser> {
    if (await BlockedNumbersService.isBlocked(data.phoneNumber)) {
      throw new Error("Phone number is blocked");
    }

    try {
      const user = new UserModel(data);
      return await user.save();
    } catch (error: any) {
      const DUPLICATE_KEY_ERROR_CODE = 11000;
      if (error.code === DUPLICATE_KEY_ERROR_CODE) {
        throw new Error("User with this phone number already exists");
      }
      throw error;
    }
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
