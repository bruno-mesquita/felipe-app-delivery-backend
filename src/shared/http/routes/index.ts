import { Router } from 'express';

import adminRouter from '@admin/admin.routes';

const routes = Router();

// routes.use('/app', clientRoutes);
routes.use('/store', adminRouter);

export default routes;
