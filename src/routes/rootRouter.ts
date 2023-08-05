import { Router, Request, Response } from 'express';

const rootRouter = Router();

rootRouter.get('/', (req: Request, res: Response) => {
    res.send(
        `<h1 style="width: 100%; background: lightgray; margin: 0; padding: 0; text-align: center;">wanted-pre-onboarding-backend-박지원 API 루트 페이지입니다.</h1>`
    );
});

export default rootRouter;
