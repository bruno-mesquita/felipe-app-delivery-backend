import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import CategoryController from './category.controller';
import { accessAdmin } from '@shared/middlewares/access-admin';

const categoryController = new CategoryController();

const categoryRoutes = Router();

categoryRoutes.post('/categories', isAuthenticated, accessAdmin, categoryController.create);
categoryRoutes.get('/categories', isAuthenticated, accessAdmin, categoryController.list);
categoryRoutes.put('/categories/:id', isAuthenticated, accessAdmin, categoryController.update);

export { categoryRoutes };
