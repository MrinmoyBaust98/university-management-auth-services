import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemister } from './academicSemister.validation';
import { AcademicSemisterController } from './academic.controller';

const router = express.Router();

router.post(
  '/create-semister',
  validateRequest(AcademicSemister.createAcademicSemisterZodSchema),
  AcademicSemisterController.createSemister
);

export const AcademicSemisterRoutes = router;
