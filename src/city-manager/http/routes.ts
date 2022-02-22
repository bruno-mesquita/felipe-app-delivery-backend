import { Router } from 'express';

import { ownerRoutes } from '../modules/establisment-owner';
import { authRoutes } from '../modules/auth';
import { cityManagerRoutes } from '../modules/city-manager';

const routes = Router();

routes.use([authRoutes, cityManagerRoutes, ownerRoutes]);

export default routes;
