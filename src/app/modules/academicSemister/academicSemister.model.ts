import { Schema, model } from 'mongoose';
import {
  AcademicSemisterModel,
  IAcademicSemister,
} from './academicSemister.interface';
import {
  academicSemisterCode,
  academicSemisterMonth,
  academicSemisterTitle,
} from './academicSemister.constant';
import ApiError from '../../../error/ApiError';

import status from 'http-status';

//  Create a Schema corresponding to the document interface.

const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: { type: String, required: true, enum: academicSemisterTitle },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemisterCode },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonth,
    },
  },
  {
    timestamps: true,
  }
);
//handle Common year and semister Issue
academicSemisterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic Semister is already exist');
  }
  next();
});

// Create  Model.
export const AcademicSemister = model<IAcademicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  academicSemisterSchema
);
