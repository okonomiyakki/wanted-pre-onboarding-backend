import express from 'express';
import rootRouter from './rootRouter';
import userRouter from './userRouter';
import postRouter from './postRouter';

const router = express.Router();

router.use('/v1', rootRouter);

router.use('/v1/users', userRouter);

router.use('/v1/posts', postRouter);

export default router;
