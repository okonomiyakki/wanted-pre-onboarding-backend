import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../configs/envconfig';
import hashPassword from '../utils/passwordHasher';
import * as AppErrors from '../middlewares/errorHandler';
import * as User from '../types/userType';
import * as userRepository from '../repositories/userRepository';

/** 회원가입 - 비밀번호 해싱 */
export const signUpUser = async (sginUpInfo: User.SignUp) => {
  const foundHashedPassword = await hashPassword(sginUpInfo.password);

  sginUpInfo.password = foundHashedPassword;

  const createdUserId = await userRepository.createUser(sginUpInfo);

  return createdUserId;
};

/** 로그인 - 엑세스 토큰, 리프레시 토큰 발급 */
export const logInUser = async (logInInfo: User.LogIn): Promise<User.Tokens> => {
  try {
    const foundUserInfo: User.Info = await userRepository.findUserInfoByEmail(logInInfo.email);

    const isPasswordMatch = await bcrypt.compare(logInInfo.password, foundUserInfo.password);

    if (!isPasswordMatch) throw AppErrors.handleBadRequest('비밀번호가 일치하지 않습니다.');

    const payload: User.Payload = {
      user_id: foundUserInfo.user_id,
      email: foundUserInfo.email,
    };

    const accessTokenSecret = env.ACCESS_TOKEN_SECRET || 'WANTED_ACCESS_TOKEN_SECRET_DEFAULT';

    const refreshTokenSecret = env.REFRESH_TOKEN_SECRET || 'WANTED_REFRESH_TOKEN_SECRET_DEFAULT';

    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    });

    const userTokens: User.Tokens = {
      accessToken,
      refreshToken,
    };

    return userTokens;
  } catch (error) {
    throw error;
  }
};
