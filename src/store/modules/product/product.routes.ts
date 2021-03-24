/**
 * @fileoverview Controller do estabelecimento Admin
 *
 * @author Jonatas Rosa Moura
 */

import { Router } from 'express';
import ProductController from './controllers/products-controller';
import { ImagesController } from './controllers/image-product-controller';

const productController = new ProductController();
const imageController = new ImagesController();
const productsRoutes = Router();

productsRoutes.post('/products', productController.create);
productsRoutes.get('/products', productController.list);
productsRoutes.get('/products/:id', productController.show);
productsRoutes.put('/products/:id', productController.update);

productsRoutes.post('/products/images', imageController.create);

export { productsRoutes };
