import { Router } from 'express';

import clientRoutes from '@customer/routes';
import establishmentRoutes from '@store/routes';
import adminRouter from '@admin/index.routes';

const routes = Router();

routes.use('/app', clientRoutes);
routes.use('/admin', adminRouter);
routes.use('/establishment', establishmentRoutes);

export default routes;
