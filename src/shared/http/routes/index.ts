import { Router } from 'express';

import clientRoutes from '@customer/routes';
import establishmentRouter from '@admin/index.routes';

const routes = Router();

routes.use('/client', clientRoutes);
routes.use('/store', establishmentRouter);

export default routes;
