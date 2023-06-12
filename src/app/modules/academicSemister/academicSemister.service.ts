import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import {
  academicSemisterSearchField,
  academicSemisterTitleCodeMapper,
} from './academicSemister.constant';
import {
  IAcademicSemister,
  IAcademicSemisterFilter,
} from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

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

const getAllSemisters = async (
  filters: IAcademicSemisterFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  //organizaton & come from Helper for filter --->
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemisterSearchField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  //for filter exectly match
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  //organizaton & come from Helper for pagination--->
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.paginationCalculate(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemister.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemister.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// single semister Service
const getSingleSemister = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findById(id);
  return result;
};

// update Semister Service
const updateSemister = async (
  id: string,
  payload: Partial<IAcademicSemister>
): Promise<IAcademicSemister | null> => {
  //Title and Code mapper cheek
  if (
    payload.title &&
    payload.code &&
    academicSemisterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semister Code');
  }

  // after cheeking start update here
  const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// Delete Semister Service
const deleteSemister = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findOneAndDelete({ _id: id });
  return result;
};

export const AcademicSemisterService = {
  createSemister,
  getAllSemisters,
  getSingleSemister,
  updateSemister,
  deleteSemister,
};
