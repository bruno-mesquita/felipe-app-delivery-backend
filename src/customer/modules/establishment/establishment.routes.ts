import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';

import EstablishmentController from './establishment.controller';

const routes = Router();
const establishmentController = new EstablishmentController();

const middlewares = [isAuthenticated, accessClient];

routes.get('/establishments/:id', ...middlewares, establishmentController.findOne);
routes.get('/establishments-by-name', ...middlewares, establishmentController.searchByName);
routes.get('/establishments', ...middlewares, establishmentController.list);
routes.get('/establishments/:id/menus', ...middlewares, establishmentController.listMenus);

export default routes;
