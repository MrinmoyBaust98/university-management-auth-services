import { RequestHandler } from 'express';
import { AcademicSemisterService } from './academicSemister.service';

const createSemister: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemisterService.createSemister(
      academicSemisterData
    );
    res.status(200).json({
      success: true,
      message: 'Academic Semister  Created Successfully',
      data: result,
    });
  } catch (error) {
    next(error);

    // res.status(400).json({
    //   // success: false,
    //   // message: 'Feild to createuser',
    //   error: error,
    // })
  }
};

export const AcademicSemisterController = {
  createSemister,
};
