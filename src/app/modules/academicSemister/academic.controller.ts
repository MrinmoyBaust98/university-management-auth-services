import { NextFunction, Request, Response } from 'express';
import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constants/paginationConstant';
import { IAcademicSemister } from './academicSemister.interface';
import { academicSemisterFilterableField } from './academicSemister.constant';

const createSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemisterService.createSemister(
      academicSemisterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semister  Created Successfully',
      // meat:{
      //   page:1,
      //   limit:1,
      //   total:1
      // },
      data: result,
    });

    next();
  }
);

// Get Semisters via pagination
const getAllSemisters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemisterFilterableField);
    const paginationOptions = pick(req.query, paginationField);

    const searchTerm = req.query.searchTerm as string;
    const result = await AcademicSemisterService.getAllSemisters(
      { ...filters, searchTerm },
      paginationOptions
    );

    sendResponse<IAcademicSemister[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semister retrived Successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const AcademicSemisterController = {
  createSemister,
  getAllSemisters,
};
