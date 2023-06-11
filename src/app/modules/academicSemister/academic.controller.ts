import { NextFunction, Request, Response } from 'express';
import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemisterService.createSemister(
      academicSemisterData
    );

    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semister  Created Successfully',
      data: result,
    });
  }
);

export const AcademicSemisterController = {
  createSemister,
};
