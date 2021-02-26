import { Router } from 'express';
import { clientRouterAdmin } from './modules/client/client.routes';
import establishmentRouter from './modules/establishment/establishment.routes';

const adminRouter = Router();

adminRouter.use('/store', establishmentRouter);
adminRouter.use('/client', clientRouterAdmin)

export default adminRouter;
