import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authRequestType';
import jwt from 'jsonwebtoken';
import env from '../configs/envconfig';
import AppError from '../types/appErrorType';
import * as AppErrors from '../middlewares/errorHandler';
import * as User from '../types/userType';
import { generateNewAccessToken } from '../utils/accessTokenGenerator';

const generateNewAccessTokenHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.RefreshToken;

    if (refreshToken === undefined)
      throw AppErrors.handleUnauthorized('RefreshToken이 존재하지 않습니다.');

    const refreshTokenSecret = env.REFRESH_TOKEN_SECRET || 'WANTED_ACCESS_TOKEN_SECRET_DEFAULT';

    /* RefreshToken 검증 */
    if (refreshToken) {
      const decodedRefreshToken = jwt.verify(refreshToken, refreshTokenSecret) as User.decodedToken;

      const currentTime = Math.floor(Date.now() / 1000);

      /* RefreshToken 검증 완료 시 만료시간 검사*/
      if (decodedRefreshToken.exp >= currentTime) {
        const newAccessTokenInfo = generateNewAccessToken(decodedRefreshToken);

        /* 응답 바디로 AccessToken 재발급 */
        res.status(200).json({ message: 'generate new AccessToken', data: newAccessTokenInfo });
      }
    }
  } catch (error: any) {
    if (error instanceof AppError) next(error);
    else if (error.message === 'jwt expired')
      next(AppErrors.handleUnauthorized('RefreshToken이 만료되었습니다. 다시 로그인해 주세요.'));
    else if (error.message === 'jwt malformed')
      next(AppErrors.handleUnauthorized('RefreshToken이 유효하지 않습니다.'));
    else next(AppErrors.handleInternalServerError());
  }
};

const AuthenticateHandler = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];

    const accessToken = authHeader && authHeader.split('Bearer ')[1];

    if (accessToken === undefined)
      throw AppErrors.handleUnauthorized(
        'AccessToken이 존재하지 않습니다. 로그인 후 이용해 주세요.'
      );

    const accessTokenSecret = env.ACCESS_TOKEN_SECRET || 'WANTED_ACCESS_TOKEN_SECRET_DEFAULT';

    /* AccessToken 검증 */
    if (accessToken) {
      const decodedAccessToken = jwt.verify(accessToken, accessTokenSecret) as User.decodedToken;

      const currentTime = Math.floor(Date.now() / 1000);

      /* AccessToken 검증 완료 시 만료시간 검사 */
      if (decodedAccessToken.exp >= currentTime) {
        req.user = decodedAccessToken;

        /* AccessToken이 만료되지 않았으면 통과 */
        return next();
      }
    }
  } catch (error: any) {
    if (error instanceof AppError) next(error);
    else if (error.message === 'jwt expired')
      /* AccessToken 만료 시 재발급 함수 호출 */
      generateNewAccessTokenHandler(req, res, next);
    else if (error.message === 'jwt malformed')
      next(AppErrors.handleUnauthorized('AccessToken이 유효하지 않습니다.'));
  }
};

export default AuthenticateHandler;
