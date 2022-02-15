import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';

import MenuController from './menu.controller';

const middlewares = [isAuthenticated, accessClient];

const routes = Router();
const menuController = new MenuController();

routes.get('/menus/:id/products', ...middlewares, menuController.findProductsByMenu);

export default routes;
