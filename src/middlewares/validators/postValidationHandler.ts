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

export const editPostValidateHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.user;
    const post_id = parseInt(req.params.id);
    const { title, content } = req.body;

    const editPost = new Post.EditPostDto(user_id, post_id, title, content);

    validateDto(editPost, next);
  } catch (error) {
    next(AppErrors.handleInternalServerError());
  }
};

export const removePostValidateHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.user;
    const post_id = parseInt(req.params.id);

    const RemovePost = new Post.RemovePostDto(user_id, post_id);

    validateDto(RemovePost, next);
  } catch (error) {
    next(AppErrors.handleInternalServerError());
  }
};
