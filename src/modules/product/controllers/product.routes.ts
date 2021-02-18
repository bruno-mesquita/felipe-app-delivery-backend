/**

 * @fileoverview Controller do estabelecimento Admin

 *

 * @author Jonatas Rosa Moura

 */

import { Router } from 'express';
import ProductController from './products-controller';

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/', productController.create);

export default productRouter;
