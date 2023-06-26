import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { User } from '../users/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwthelpers';

//login service

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
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

  // data ---->isuserExist
  // id previously used,so this process for 2nd use
  const { id: userID, role, needsPasswordChange } = isuserExist;

  // as tokens are same type so we use reuseable function.
  // we create it helpers folder...because it helps us to create token

  // access Token Create
  const accessToken = jwtHelpers.createToken(
    { userID, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expairs_in as string
  );

  // refresh access Token Create
  const refreshAccessToken = jwtHelpers.createToken(
    { userID, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expairs_in as string
  );

  return {
    accessToken,
    refreshAccessToken,
    needsPasswordChange,
  };
};

// refresh token service
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invallid Refresh Token');
  }

  // refresh token exist or not
  const user = new User();
  const { userId } = verifiedToken;
  const isUserExist = await user.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not Exist ');
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.secret_expairs_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
