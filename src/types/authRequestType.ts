import { Request } from 'express';
import { Payload } from './userType';

declare global {
  namespace Express {
    interface Request {
      user: Payload;
    }
  }
}

export interface AuthRequest extends Request {}
