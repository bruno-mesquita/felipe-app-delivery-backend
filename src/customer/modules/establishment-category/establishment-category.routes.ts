import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import EstablishmentController from './establishment-category.controller';

const establishmentController = new EstablishmentController();

const routes = Router();

routes.use(isAuthenticated);
routes.get('/establishments-categories', establishmentController.getAll);

export default routes;
