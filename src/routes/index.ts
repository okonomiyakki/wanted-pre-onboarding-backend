import express from 'express';
import rootRouter from './rootRouter';
import userRouter from './userRouter';

const router = express.Router();

router.use('/v1', rootRouter);
router.use('/v1/users', userRouter);

export default router;
