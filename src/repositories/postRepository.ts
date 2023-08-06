import db from '../configs/dbconfig';
import * as AppErrors from '../middlewares/errorHandler';
import * as Post from '../types/postType';

/** 게시글 등록 */
export const createPost = async (inputData: Post.CreateInfo): Promise<void> => {
  try {
    const createColumns = `
    user_id,
    title,
    content
    `;

    const createValues = Object.values(inputData);

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
