import * as Post from '../types/postType';
import * as postRepository from '../repositories/postRepository';

/** 게시글 등록 */
export const addPost = async (inputData: Post.CreateInfo): Promise<void> => {
  await postRepository.createPost(inputData);
};
