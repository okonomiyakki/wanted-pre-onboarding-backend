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

/** 게시글 수정 라우터 */
postRouter.patch(
  '/:id',
  AuthenticateHandler,
  postValidator.editPostValidateHandler,
  postController.editPostHandler
);

/** 게시글 삭제 라우터 */
postRouter.delete(
  '/:id',
  AuthenticateHandler,
  postValidator.removePostValidateHandler,
  postController.removePostHandler
);

/** 게시글 전체 조회 */
postRouter.get('/', postValidator.getAllPostsValidateHandler, postController.getAllPostsHandler);

/** 게시글 단일 조회 */
postRouter.get('/:id', postValidator.getPostValidateHandler, postController.getPostHandler);

export default postRouter;
