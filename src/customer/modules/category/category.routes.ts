import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';

import CategoryController from './category.controller';

const routes = Router();
const categoryController = new CategoryController();

const middlewares = [isAuthenticated, accessClient];

routes.get('/categories', ...middlewares, categoryController.getAll);

export default routes;
