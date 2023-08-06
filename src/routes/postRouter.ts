import { Router } from 'express';
import AuthenticateHandler from '../middlewares/authHandler';
import * as postValidator from '../middlewares/validators/postValidationHandler';
import * as postController from '../controllers/postController';

const postRouter = Router();

/** 게시글 등록 라우터 */
postRouter.post(
  '/',
  AuthenticateHandler,
  postValidator.addPostValidateHandler,
  postController.addPostHandler
);

export default postRouter;
