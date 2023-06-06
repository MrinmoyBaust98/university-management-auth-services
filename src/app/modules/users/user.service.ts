import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../../config/index';
import { generatedUserId } from './utils/user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // amr lagbe , auto generated incrimental id,
  // default password for initial login
  const id = await generatedUserId();
  user.id = id;
  if (!user.password) {
    user.password = config.user_default_pass as string;
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new Error('Faild to connect');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
