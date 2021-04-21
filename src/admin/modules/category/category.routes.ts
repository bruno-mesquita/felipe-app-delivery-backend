import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import CategoryController from './category.controller';

const categoryController = new CategoryController();

const categoryRoutes = Router();

categoryRoutes.post('/categories', isAuthenticated, categoryController.create);
categoryRoutes.get('/categories', isAuthenticated, categoryController.list);
categoryRoutes.put('/categories/:id', isAuthenticated, categoryController.update);

export { categoryRoutes };
