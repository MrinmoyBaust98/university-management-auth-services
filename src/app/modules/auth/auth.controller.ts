import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

//login user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  // refresh token set in cookie
  const { refreshAccessToken, ...others } = result;
  const cookieoptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshAccessToken, cookieoptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login Successfully',
    data: others,
  });
});

// refreshToken
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshAccessToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshAccessToken);

  // refresh token set in cookie
  const cookieoptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshAccessToken, cookieoptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login Successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
