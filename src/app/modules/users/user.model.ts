import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, reference: 'Faculty' },
    // admin:{type:Schema.Types.ObjectId,reference:'Admin'}
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Create  Model.
export const User = model<IUser, UserModel>('User', userSchema);
