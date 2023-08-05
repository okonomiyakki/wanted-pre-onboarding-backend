import { Request, Response, NextFunction } from 'express';
import { validateDto } from '../../utils/dtoValidator';
import * as AppErrors from '../../middlewares/errorHandler';
import * as User from '../../dtos/userDto';

export const signUpUserValidateHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const signUp = new User.SignUpDto(email, password);

    validateDto(signUp, next);
  } catch (error) {
    next(AppErrors.handleInternalServerError());
  }
};

export const logInUserValidateHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const logIn = new User.LogInDto(email, password);

    validateDto(logIn, next);
  } catch (error) {
    next(AppErrors.handleInternalServerError());
  }
};
