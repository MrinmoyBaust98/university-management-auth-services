import { NextFunction, Request, Response } from 'express';
import ApiError from '../../error/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwthelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
      }
      // verify token
      let verifyUser = null;
      verifyUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      // req er majhe user set korbo
      req.user = verifyUser; // verifyUser ea thakbe role,userid

      // checking using user role
      if (requiredRoles.length && !requiredRoles.includes(verifyUser.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          ' You are not Authorized For this section'
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
