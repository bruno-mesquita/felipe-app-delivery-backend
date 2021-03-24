import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import EstablishmentController from './controllers/establishment.controller';
import { MenuController } from './controllers/menu-controller';

const establishmentController = new EstablishmentController();
const menuController = new MenuController();

const routes = Router();

routes.use(isAuthenticated);
routes.get('/establishments/:categoryId/category', establishmentController.getAll);
routes.get('/establishments/:id/menu', menuController.listMenu);

export default routes;
