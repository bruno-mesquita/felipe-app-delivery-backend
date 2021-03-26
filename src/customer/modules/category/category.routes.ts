import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import CategoryController from './category.controller';

const categoryController = new CategoryController();

const routes = Router();

routes.use(isAuthenticated);
routes.get('/categories', categoryController.getAll);

export default routes;
