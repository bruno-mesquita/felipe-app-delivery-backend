import { Router } from 'express';

import isAuthenticated from '@shared/middlewares/is-authenticated';
import { accessClient } from '@shared/middlewares/access-client';

import { ProductController } from './product.controller';

const routes = Router();
const productController = new ProductController();
const middlewares = [isAuthenticated, accessClient];

routes.get('/products/:id', ...middlewares, productController.findOne);

export default routes;
