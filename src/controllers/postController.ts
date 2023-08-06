import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authRequestType';
import AppError from '../types/appErrorType';
import * as AppErrors from '../middlewares/errorHandler';
import * as Post from '../types/postType';
import * as postService from '../services/postService';

/** 게시글 등록 */
export const addPostHandler = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.user;
    const { title, content } = req.body;

    const createPostInfo: Post.CreateInfo = {
      user_id,
      title,
      content,
    };

    await postService.addPost(createPostInfo);

    res.status(201).json({ message: '게시글 등록 성공', data: {} });
  } catch (error) {
    error instanceof AppError ? next(error) : next(AppErrors.handleInternalServerError());
  }
};

/** 게시글 수정 */
export const editPostHandler = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.user;
    const post_id = parseInt(req.params.id);
    const { title, content } = req.body;

    const updatePostInfo: Post.UpdateInfo = {
      title,
      content,
    };

    await postService.editPost(user_id, post_id, updatePostInfo);

    res.status(201).json({ message: '게시글 수정 성공', data: {} });
  } catch (error) {
    error instanceof AppError ? next(error) : next(AppErrors.handleInternalServerError());
  }
};

/** 게시글 삭제 */
export const removePostHandler = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.user;
    const post_id = parseInt(req.params.id);

    await postService.removePost(user_id, post_id);

    res.status(201).json({ message: '게시글 삭제 성공', data: {} });
  } catch (error) {
    error instanceof AppError ? next(error) : next(AppErrors.handleInternalServerError());
  }
};
