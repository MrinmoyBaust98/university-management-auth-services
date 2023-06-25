import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  // jehetu id password checking common method ....sob jaygay use korbo..tai agulake inatance hisabe use korbo.....code see(user-interface,user-model)

  // instance create kore use
  const user = new User();
  //cheek user id really exist or not in database
  const isuserExist = await user.isUserExist(id);

  if (!isuserExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User Not Found OR Id is not vallid'
    );
  }

  // Match Password

  if (
    isuserExist.password &&
    !user.isPasswordMatch(password, isuserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User password is not Vallid');
  }

  // access Token Create

  return;
};

export const AuthService = {
  loginUser,
};
