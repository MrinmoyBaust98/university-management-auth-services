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

//get a single semister
router.get('/:id', AcademicSemisterController.getSingleSemister);

//Update semister
router.patch(
  '/:id',
  validateRequest(AcademicSemister.updateAcademicSemisterZodSchema),
  AcademicSemisterController.updateSemister
);

//Delete semister
router.delete('/:id', AcademicSemisterController.deleteSemister);

// get All semister
router.get('/', AcademicSemisterController.getAllSemisters);

export const AcademicSemisterRoutes = router;
