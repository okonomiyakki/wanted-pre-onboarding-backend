import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../types/authRequestType';
import { validateDto } from '../../utils/dtoValidator';
import * as AppErrors from '../../middlewares/errorHandler';
import * as Post from '../../dtos/postDto';

export const addPostValidateHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.user;
    const { title, content } = req.body;

    const addPost = new Post.AddPostDto(user_id, title, content);

    validateDto(addPost, next);
  } catch (error) {
    next(AppErrors.handleInternalServerError());
  }
};
