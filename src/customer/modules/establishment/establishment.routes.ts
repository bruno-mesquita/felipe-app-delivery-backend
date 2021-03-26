import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import EstablishmentController from './controllers/establishment.controller';

const establishmentController = new EstablishmentController();

const routes = Router();

routes.use(isAuthenticated);
routes.get('/establishments/:categoryId/category', establishmentController.getAll);
routes.get('/establishments/:id', establishmentController.findOne);
routes.post('/establishments', establishmentController.searchByName);

export default routes;
