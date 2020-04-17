import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default function globalExceptionHandler(
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response<AppError> {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  /* eslint-disable no-console */
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
