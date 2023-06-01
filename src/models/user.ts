import { Model, Schema, model } from "mongoose";

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface UserDoc extends User, Document {}

export interface UserModel extends Model<UserDoc> {}

const UserSchema = new Schema<UserDoc, UserModel>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model<UserDoc, UserModel>("User", UserSchema);
