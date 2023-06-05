import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

//  Create a Schema corresponding to the document interface.

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create  Model.
export const User = model<IUser, UserModel>('User', userSchema);
