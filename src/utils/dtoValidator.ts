import { NextFunction } from 'express';
import { validateOrReject, ValidationError } from 'class-validator';
import * as AppErrors from '../middlewares/errorHandler';

export const validateDto = (dto: any, next: NextFunction) => {
  validateOrReject(dto)
    .then(next)
    .catch((errors: ValidationError[]) => {
      console.log('Validation Info : ', errors);
      const errorMessage = errors
        .map((error) => (error.constraints ? Object.values(error.constraints).join(' ') : ''))
        .join(' & ');

      next(AppErrors.handleBadRequest(errorMessage));
    });
};
