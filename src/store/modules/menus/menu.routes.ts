import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';
import { MenuController } from './menu.controller';

const menuRoutes = Router();
const menuController = new MenuController();

const middlewares = [isAuthenticated, accessEstablishmentOwner];

menuRoutes.post('/menus', ...middlewares, menuController.create);
menuRoutes.get('/menus', ...middlewares, menuController.list);
menuRoutes.get('/menus/:id', ...middlewares, menuController.findOne);
menuRoutes.put('/menus/:id', ...middlewares, menuController.update);
menuRoutes.delete('/menus/:id', ...middlewares, menuController.delete);

export { menuRoutes };
