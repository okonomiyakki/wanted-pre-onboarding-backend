import db from '../configs/dbconfig';
import * as AppErrors from '../middlewares/errorHandler';
import * as User from '../types/userType';

/** 회원가입 - 회원 정보 저장 */
export const createUser = async (sginUpInfo: User.SignUp): Promise<void> => {
  try {
    const createColums = `
    email,
    password
    `;

    const createValues = Object.values(sginUpInfo);

    const SQL = `
    INSERT INTO
    user (${createColums})
    VALUES (?, ?)
    `;

    await db.execute(SQL, createValues);
  } catch (error) {
    throw AppErrors.handleBadRequest('이미 존재하는 이메일 입니다.');
  }
};

/* 로그인 - 회원 정보 조회  */
export const findUserInfoByEmail = async (user_email: string): Promise<User.Info> => {
  try {
    const selectColumns = `
    user_id, 
    email,
    password
    `;

    const SQL = `
    SELECT ${selectColumns}
    FROM user
    WHERE email = ?
    `;

    const [user]: any = await db.query(SQL, [user_email]);

    if (!user[0])
      throw AppErrors.handleNotFound('존재하지 않는 회원입니다. 회원 가입 후 이용해 주세요.');

    return user[0];
  } catch (error) {
    throw error;
  }
};
