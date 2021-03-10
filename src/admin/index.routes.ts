import { Router } from 'express';
import { stateCityRoutes } from './modules/address/state-city.routes';
import { clientRouterAdmin } from './modules/client/client.routes';
import establishmentRouter from './modules/establishment/establishment.routes';

const adminRouter = Router();

adminRouter.use('/store', establishmentRouter);
adminRouter.use('/client', clientRouterAdmin);
adminRouter.use('/stateCity', stateCityRoutes);

export default adminRouter;
