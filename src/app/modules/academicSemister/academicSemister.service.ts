import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { academicSemisterTitleCodeMapper } from './academicSemister.constant';
import { IAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';

const createSemister = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  //Title and Code mapper cheek
  if (academicSemisterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semister Code');
  }

  const result = await AcademicSemister.create(payload);
  return result;
};

export const AcademicSemisterService = { createSemister };
