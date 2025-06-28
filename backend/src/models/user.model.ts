import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  phoneNumber: string;
  address: string;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
