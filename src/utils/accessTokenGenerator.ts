import jwt from 'jsonwebtoken';
import env from '../configs/envconfig';
import * as User from '../types/userType';

export const generateNewAccessToken = (decodedRefreshToken: User.decodedToken) => {
  const newPayload: User.Payload = {
    user_id: decodedRefreshToken.user_id,
    email: decodedRefreshToken.email,
  };

  const accessTokenSecret = env.ACCESS_TOKEN_SECRET || 'WANTED_ACCESS_TOKEN_SECRET_DEFAULT';

  const newAccessToken = jwt.sign(newPayload, accessTokenSecret, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  });

  const newAccessTokenInfo = {
    newAccessToken,
  };
  return newAccessTokenInfo;
};
