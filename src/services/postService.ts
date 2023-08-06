import * as Post from '../types/postType';
import * as postRepository from '../repositories/postRepository';

/** 게시글 등록 */
export const addPost = async (createPostInfo: Post.CreateInfo): Promise<void> => {
  await postRepository.createPost(createPostInfo);
};

/** 게시글 수정 */
export const editPost = async (
  user_id: number,
  post_id: number,
  updatePostInfo: Post.UpdateInfo
): Promise<void> => {
  await postRepository.updatePost(user_id, post_id, updatePostInfo);
};

/** 게시글 삭제 */
export const removePost = async (user_id: number, post_id: number): Promise<void> => {
  await postRepository.deletePost(user_id, post_id);
};
