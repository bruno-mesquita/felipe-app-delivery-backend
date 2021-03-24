import { Router } from 'express';
import { MenuController } from './controller-menu';

const menuController = new MenuController();

const menuRoutes = Router();

menuRoutes.post('/menus', menuController.create);

export { menuRoutes };
