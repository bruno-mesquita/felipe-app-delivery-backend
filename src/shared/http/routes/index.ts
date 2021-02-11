import addressRouter from '@domain/address/routes/address.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/address', addressRouter);

export default routes;
