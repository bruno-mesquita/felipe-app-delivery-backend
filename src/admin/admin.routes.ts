import { Router } from 'express';
import establishmentRouter from './modules/establishment/establishment.routes';

const adminRouter = Router();

adminRouter.post('/create', establishmentRouter);

export default adminRouter;
