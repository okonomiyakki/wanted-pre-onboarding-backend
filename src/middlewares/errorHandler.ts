import { Request, Response, NextFunction } from 'express';
import AppError from '../types/appErrorType';

export const handleBadRequest = (message: string = 'Bad Request'): AppError => {
  return new AppError(400, message);
};

export const handleUnauthorized = (message: string = 'Unauthorized'): AppError => {
  return new AppError(401, message);
};

export const handleForbidden = (message: string = 'Forbidden'): AppError => {
  return new AppError(403, message);
};

export const handleNotFound = (message: string = 'Not Found'): AppError => {
  return new AppError(404, message);
};

export const handleInternalServerError = (message: string = 'Internal Server Error'): AppError => {
  return new AppError(500, message);
};

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;

  console.error(err);

  res.status(statusCode || 500).json({
    status: 'Error',
    statusCode: statusCode || 500,
    message: message || '서버에서 에러가 발생했습니다.',
  });
};
