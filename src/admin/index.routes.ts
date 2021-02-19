import { Router } from 'express';
import establishmentRouter from './modules/establishment/establishment.routes';

const adminRouter = Router();

adminRouter.use(establishmentRouter);

export default adminRouter;
