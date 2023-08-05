import hashPassword from '../utils/passwordHasher';
import * as User from '../types/userType';
import * as userRepository from '../repositories/userRepository';

/** 회원 가입 - 비밀번호 해싱 */
export const signUpUser = async (sginUpInfo: User.SignUp) => {
  const foundHashedPassword = await hashPassword(sginUpInfo.password);

  sginUpInfo.password = foundHashedPassword;

  const createdUserId = await userRepository.createUser(sginUpInfo);

  return createdUserId;
};
