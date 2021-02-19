import { Router } from 'express';

import adminRouter from '@admin/admin.routes';
import establishmentRouter from '@admin/modules/establishment/establishment.routes';

const routes = Router();

// routes.use('/app', clientRoutes);
routes.use('/store', adminRouter);
routes.use('/esta', establishmentRouter); // teste -> deu certo!

export default routes;
