/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../error/handleValidationError';
import config from '../../config';
import ApiError from '../../error/ApiError';
import { Error } from 'mongoose';
import { errorLogger } from '../../shared/Logger/logger';

import { ZodError } from 'zod';
import handleZodError from '../../error/handleZodError';
import handleCastError from '../../error/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {
  config.env === 'development'
    ? console.log('GlobalhandalerError ~~', error)
    : errorLogger.error('GlobalhandalerError ~~', error);

  let statusCode = 500;
  let message = 'Something went Wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
