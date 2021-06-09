/**
 * @fileoverview Controller do produto

 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';

import {
  CreateProductService,
  DeleteProductService,
  ListProductsService,
  ShowProductService,
  UpdateProductService,
  SearchNameProductsService
} from './services';

class ProductController {
  async searchName(req: Request, res: Response): Promise<Response> {
    try {
      const searchNameProductsService = new SearchNameProductsService();
      const { search } = req.query;

      const products = await searchNameProductsService.execute(search as string, req.client.entity.establishment_id);

      if (products.err) throw new Error(products.err);

      return res.status(200).json(products);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { page = 0 } = req.query;

      const listProductsService = new ListProductsService();

      const products = await listProductsService.execute(req.client.entity.establishment_id, Number(page));

      if (products.err) throw new Error(products.err);

      return res.status(200).json(products);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const productService = new ShowProductService();

      const product = await productService.execute(Number(id), req.client.entity.establishment_id);

      if (product.err) throw new Error(product.err);

      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createProductService = new CreateProductService();

      const product = await createProductService.execute(req.body);

      if (product.err) throw new Error(product.err);

      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateProductService = new UpdateProductService();

      const updateProduct = await updateProductService.execute({
        ...req.body,
        id,
      });

      if (updateProduct.err) throw new Error(updateProduct.err);

      return res.status(200).json(updateProduct);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { menu_id, product_id } = req.params;
      const deleteProductService = new DeleteProductService();

      const result = await deleteProductService.execute({ menu_id: Number(menu_id), product_id: Number(product_id)});

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default ProductController;
