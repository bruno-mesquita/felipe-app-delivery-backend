/**

 * @fileoverview Controller do produto

 *

 * @author Jonatas Rosa Moura

 */

import { Request, Response } from 'express';
import CreateProductService from '../services/create-product-service/create-product.service';

class ProductController {
  async create(req: Request, res: Response) {
    try {
      const createProductService = new CreateProductService();

      const product = await createProductService.execute(req.body);

      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default ProductController;
