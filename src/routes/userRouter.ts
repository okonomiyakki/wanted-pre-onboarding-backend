import { Router } from 'express';
import * as userValidator from '../middlewares/validators/userValidationHandler';
import * as userController from '../controllers/userController';

const userRouter = Router();

/** 회원가입 라우터 */
userRouter.post(
  '/signup',
  userValidator.signUpUserValidateHandler,
  userController.signUpUserHandler
);

/** 로그인 라우터 */
userRouter.post('/login', userValidator.logInUserValidateHandler, userController.logInUserHandler);

export default userRouter;
