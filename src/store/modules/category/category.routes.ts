import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { CategoryController } from './category.controller';

const categoryController = new CategoryController();

const categoryRoutes = Router();

categoryRoutes.get('/categories', isAuthenticated, categoryController.list);

export { categoryRoutes };
