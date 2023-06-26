import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

//login
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

//Refresh Token
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
// router.get('/', AdminController.getAllAdmins);

// router.delete('/:id', AdminController.deleteAdmin);

// router.patch(
//   '/:id',
//   validateRequest(AdminValidation.updateAdmin),
//   AdminController.updateAdmin
// );

export const AuthRoutes = router;
