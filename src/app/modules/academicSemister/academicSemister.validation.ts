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
    year: z.string({ required_error: 'Year is Required' }),
    code: z.enum([...academicSemisterCode] as [string, ...string[]]),
    startMonth: z.enum([...academicSemisterMonth] as [string, ...string[]], {
      required_error: 'Start Month Is Required',
    }),
    endMonth: z.enum([...academicSemisterMonth] as [string, ...string[]], {
      required_error: 'End month Is required',
    }),
  }),
});

// Zod Schema for Update
// If you can update title you should also update titlecode...Otherwise you can't do it
const updateAcademicSemisterZodSchema = z.object({
  body: z
    .object({
      title: z
        .enum([...academicSemisterTitle] as [string, ...string[]], {
          required_error: 'Title is Required',
        })
        .optional(),
      year: z.string({ required_error: 'Year is Required' }).optional(),
      code: z
        .enum([...academicSemisterCode] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...academicSemisterMonth] as [string, ...string[]], {
          required_error: 'Start Month Is Required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemisterMonth] as [string, ...string[]], {
          required_error: 'End month Is required',
        })
        .optional(),
    })
    .refine(data => (data.title && data.code) || (!data.title && !data.code), {
      message: 'Either both title and code should be provided or neither',
    }),
});

export const AcademicSemister = {
  createAcademicSemisterZodSchema,
  updateAcademicSemisterZodSchema,
};
