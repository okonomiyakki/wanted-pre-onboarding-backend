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
