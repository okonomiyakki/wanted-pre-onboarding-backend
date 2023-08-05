import db from '../configs/dbconfig';
import AppError from '../types/appErrorType';
import * as AppErrors from '../middlewares/errorHandler';
import * as User from '../types/userType';

/** 회원 가입 - DB에 회원정보 저장*/
export const createUser = async (sginUpInfo: User.SignUp): Promise<void | AppError> => {
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
