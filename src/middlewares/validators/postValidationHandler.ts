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

    const removePost = new Post.RemovePostDto(user_id, post_id);

    validateDto(removePost, next);
  } catch (error) {
    next(AppErrors.handleInternalServerError());
  }
};

export const getAllPostsValidateHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, size } = req.query;

    const getAllPosts = new Post.GetAllPostsDto(Number(page), Number(size));

    validateDto(getAllPosts, next);
  } catch (error) {
    console.log(error);
    next(AppErrors.handleInternalServerError());
  }
};

export const getPostValidateHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const post_id = parseInt(req.params.id);

    const getPost = new Post.GetPostDto(post_id);

    validateDto(getPost, next);
  } catch (error) {
    console.log(error);
    next(AppErrors.handleInternalServerError());
  }
};
