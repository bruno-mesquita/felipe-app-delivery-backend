/**

 * @fileoverview Controller do produto

 *

 * @author Jonatas Rosa Moura

 */

import { Request, Response } from 'express';
import CreateProductService from '../services/create-product-service/create-product.service';
import { ListProductsService } from '../services/list-product-service/list-product.service';
import { ShowProductService } from '../services/show-product-service/show-product.service';

class ProductController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listProductsService = new ListProductsService();

      const products = await listProductsService.execute();

      return res.status(201).json(products);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const productService = new ShowProductService();

      const product = await productService.execute(id);

      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
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
