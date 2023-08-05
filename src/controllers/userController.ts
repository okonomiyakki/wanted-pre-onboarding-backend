import { Request, Response, NextFunction } from 'express';
import AppError from '../types/appErrorType';
import * as AppErrors from '../middlewares/errorHandler';
import * as User from '../types/userType';
import * as userService from '../services/userService';

/** 회원 가입 컨트롤러 */
export const signUpUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const sginUpInfo: User.SignUp = {
      email,
      password,
    };

    await userService.signUpUser(sginUpInfo);

    res.status(201).json({ message: '회원 가입 성공' });
  } catch (error) {
    error instanceof AppError ? next(error) : next(AppErrors.handleInternalServerError());
  }
};
