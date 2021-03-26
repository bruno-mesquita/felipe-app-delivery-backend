import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import EstablishmentController from './controllers/establishment.controller';
import { MenuController } from './controllers/menu-controller';

const establishmentController = new EstablishmentController();
const menuController = new MenuController();

const routes = Router();

routes.use(isAuthenticated);
routes.get('/establishments', establishmentController.list);
routes.get('/establishments/:id/menu', menuController.listMenu);

export default routes;
