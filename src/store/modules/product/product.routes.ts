/**
 * @fileoverview Controller do estabelecimento Admin
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';
import ProductController from './product.controller';
import { accessEstablishment } from '@shared/middlewares/access-establishment';

const productController = new ProductController();
const productsRoutes = Router();

productsRoutes.post('/products', accessEstablishment, productController.create);
productsRoutes.get('/products', accessEstablishment, productController.list);
productsRoutes.get('/products/search-name', accessEstablishment, productController.searchName);
productsRoutes.get('/products/:id', accessEstablishment, productController.show);
productsRoutes.put('/products/:id', accessEstablishment, productController.update);
productsRoutes.delete('/products/:menu_id/:product_id', accessEstablishment, productController.delete);

export { productsRoutes };
