import addressRouter from '@modules/address/routes/address.routes';
import { clientRoutes } from '@modules/client';
import { Router } from 'express';

const routes = Router();

routes.use('/address', addressRouter);
routes.use('/clients', clientRoutes);

export default routes;
