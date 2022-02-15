import { Router } from 'express';

import middlewares from '@admin/http/middlewares';

import CategoryController from './category.controller';

const categoryController = new CategoryController();

const categoryRoutes = Router();

categoryRoutes.post('/categories', ...middlewares, categoryController.create);
categoryRoutes.get('/categories', ...middlewares, categoryController.list);
categoryRoutes.put('/categories/:id', ...middlewares, categoryController.update);

export { categoryRoutes };
