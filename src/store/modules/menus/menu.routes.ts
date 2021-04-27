import { Router } from 'express';
import { MenuController } from './menu.controller';

const menuController = new MenuController();

const menuRoutes = Router();

menuRoutes.post('/menus', menuController.create);
menuRoutes.get('/menus', menuController.list);
menuRoutes.get('/menus/:id', menuController.findOne);
menuRoutes.put('/menus/:id', menuController.update);
menuRoutes.delete('/menus', menuController.delete);

export { menuRoutes };
