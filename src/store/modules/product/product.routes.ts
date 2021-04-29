/**
 * @fileoverview Controller do estabelecimento Admin
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';
import ProductController from './product.controller';

const productController = new ProductController();
const productsRoutes = Router();

productsRoutes.post('/products', productController.create);
productsRoutes.get('/products', productController.list);
productsRoutes.get('/products/search-name', productController.searchName);
productsRoutes.get('/products/:id', productController.show);
productsRoutes.put('/products/:id', productController.update);
productsRoutes.delete('/products/:menu_id/:product_id', productController.delete);

export { productsRoutes };
