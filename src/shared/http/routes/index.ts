import { Router } from 'express';

// normal user
import addressRouter from '@modules/address/routes/address.routes';
import { clientRoutes } from '@modules/client';

// Admin
import establishmentRouter from '@modules/admin/establishment/establishment.routes';
import productRouter from '@modules/product/controllers/product.routes';

const routes = Router();

routes.use('/address', addressRouter);
routes.use('/clients', clientRoutes);
routes.use('/product', productRouter);

// Routas do Admin

routes.use('/store', establishmentRouter);

export default routes;
