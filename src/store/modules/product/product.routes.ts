import { Router } from 'express';
import ProductController from './product.controller';
import { accessEstablishmentOwner } from '@shared/middlewares/access-establishment-owner';
import isAuthenticated from '@shared/middlewares/is-authenticated';

const productController = new ProductController();
const productsRoutes = Router();

const middlewares = [isAuthenticated, accessEstablishmentOwner];

productsRoutes.post('/products', ...middlewares, productController.create);
productsRoutes.get('/products', ...middlewares, productController.list);
productsRoutes.get('/products/search-name', ...middlewares, productController.searchName);
productsRoutes.get('/products/:id', ...middlewares, productController.show);
productsRoutes.put('/products/:id', ...middlewares, productController.update);
productsRoutes.delete('/products/:menu_id/:product_id', ...middlewares, productController.delete);

export { productsRoutes };
