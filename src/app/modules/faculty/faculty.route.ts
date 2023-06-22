import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { AcademicFacultyValidation } from '../academicFaculty/academicFaculty.validation';

const router = express.Router();

// get single faculty
router.get('/:id', FacultyController.getSingleFaculty);
// get All Faculty
router.get('/', FacultyController.getAllFaculties);

// Update faculty
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  FacultyController.updateFaculty
);

// Delete Faculty
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
