import { Router } from 'express';

import { MenuController } from './menu.controller';

const menuRoutes = Router();
const menuController = new MenuController();

menuRoutes.get('/menus/:id/products', menuController.findProductsByMenu);

export { menuRoutes };
