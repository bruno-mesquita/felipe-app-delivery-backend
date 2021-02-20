import { Router } from 'express';

import clientRoutes from '@customer/routes';
import establishmentAdminRoutes from '@admin/index.routes';
import establishmentRoutes from '@store/routes';

const routes = Router();

routes.use('/client', clientRoutes);
routes.use('/admin', establishmentAdminRoutes);
routes.use('/establishment', establishmentRoutes);

export default routes;
