import db from '../configs/dbconfig';
import * as AppErrors from '../middlewares/errorHandler';
import * as Post from '../types/postType';

/** 게시글 등록 */
export const createPost = async (createPostInfo: Post.CreateInfo): Promise<void> => {
  try {
    const createColumns = `
    user_id,
    title,
    content
    `;

    const createValues = Object.values(createPostInfo);

    const SQL = `
    INSERT INTO
    post (${createColumns}) 
    VALUES (?, ?, ?)
    `;

    await db.execute(SQL, createValues);
  } catch (error) {
    throw error;
  }
};

/** 게시글 수정 */
export const updatePost = async (
  user_id: number,
  post_id: number,
  updatePostInfo: Post.UpdateInfo
): Promise<void> => {
  try {
    const updateColums = Object.entries(updatePostInfo)
      .map(([key, _]) => `${key} = ?`)
      .join(', ');

    const updateValues = Object.values(updatePostInfo);

    const SQL = `
    UPDATE post
    SET ${updateColums}
    WHERE user_id = ? AND post_id = ?
    `;

    await db.execute(SQL, [...updateValues, user_id, post_id]);
  } catch (error) {
    throw error;
  }
};

/** 게시글 삭제 */
export const deletePost = async (user_id: number, post_id: number): Promise<void> => {
  try {
    const SQL = `
    DELETE FROM post
    WHERE user_id = ? AND post_id = ?
    `;

    await db.execute(SQL, [user_id, post_id]);
  } catch (error) {
    throw error;
  }
};

/** 게시글 전체 조회 */
export const findAllPosts = async (): Promise<Post.Posts> => {
  try {
    const selectColumns = `
    post_id,
    user_id,
    title,
    content
    `;

    const SQL = `
    SELECT ${selectColumns}
    FROM post
    `;

    const [posts] = await db.query(SQL);

    return posts as Post.Posts;
  } catch (error) {
    throw error;
  }
};

/** 게시글 단일 조회 */
export const findPost = async (post_id: number): Promise<Post.Post> => {
  try {
    const selectColumns = `
    post.post_id,
    user.user_id,
    user.email,
    post.title,
    post.content
    `;

    const SQL = `
    SELECT ${selectColumns}
    FROM post
    JOIN user ON user.user_id = post.user_id
    WHERE post_id = ?
    `;

    const [post]: any = await db.query(SQL, [post_id]);

    const isPostValid = post[0].post_id;

    if (!isPostValid) throw AppErrors.handleNotFound('이미 삭제된 게시글 입니다.');

    return post[0];
  } catch (error) {
    throw error;
  }
};
