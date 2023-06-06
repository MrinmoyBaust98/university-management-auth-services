import { z } from 'zod';
import {
  academicSemisterCode,
  academicSemisterMonth,
  academicSemisterTitle,
} from './academicSemister.constant';

// Zod Schema
const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemisterTitle] as [string, ...string[]], {
      required_error: 'Title is Required',
    }),
    year: z.number({ required_error: 'Year is Required' }),
    code: z.enum([...academicSemisterCode] as [string, ...string[]]),
    startMonth: z.enum([...academicSemisterMonth] as [string, ...string[]], {
      required_error: 'Start Month Is Required',
    }),
    endMonth: z.enum([...academicSemisterMonth] as [string, ...string[]], {
      required_error: 'End month Is required',
    }),
  }),
});

export const AcademicSemister = {
  createAcademicSemisterZodSchema,
};
