import * as Post from '../types/postType';
import * as postRepository from '../repositories/postRepository';
import { paginator } from '../utils/paginator';

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

/** 게시글 전체 조회 */
export const getAllPosts = async (page: number, size: number): Promise<Post.PagenateInfo> => {
  const foundPosts: Post.Posts = await postRepository.findAllPosts();

  const pagenatedPostsInfo: Post.PagenateInfo = paginator(foundPosts, page, size, true);

  return pagenatedPostsInfo;
};

/** 게시글 단일 조회 */

export const getPost = async (post_id: number): Promise<Post.Post> => {
  const foundPost: Post.Post = await postRepository.findPost(post_id);

  return foundPost;
};
