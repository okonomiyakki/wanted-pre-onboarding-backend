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
