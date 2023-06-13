import { Request, Response } from 'express';
import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constants/paginationConstant';
import { IAcademicSemister } from './academicSemister.interface';
import { academicSemisterFilterableField } from './academicSemister.constant';

const createSemister = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemisterData } = req.body;
  const result = await AcademicSemisterService.createSemister(
    academicSemisterData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister  Created Successfully',
    data: result,
  });
});

// Get Semisters via pagination
const getAllSemisters = catchAsync(async (req: Request, res: Response) => {
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
});

//get single Semister
const getSingleSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemisterService.getSingleSemister(id);

  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Semister retrived Successfully',
    data: result,
  });
});

// Update Semister
const updateSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicSemisterService.updateSemister(id, updatedData);

  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister Updated Successfully',
    data: result,
  });
});

//Delete Semister
const deleteSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemisterService.deleteSemister(id);

  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister Deleted Successfully',
    data: result,
  });
});

export const AcademicSemisterController = {
  createSemister,
  getAllSemisters,
  getSingleSemister,
  updateSemister,
  deleteSemister,
};
