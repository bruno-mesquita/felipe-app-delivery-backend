/**

 * @fileoverview Controller do estabelecimento Admin

 *

 * @author Jonatas Rosa Moura

 */

import { Router } from 'express';
import ProductController from './controllers/products-controller';

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/', productController.create);
productRouter.get('/', productController.list);
productRouter.get('/:id', productController.show);

export default productRouter;
