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

// Create  Model.
export const AcademicSemister = model<IAcademicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  academicSemisterSchema
);
