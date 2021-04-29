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
      const { name } = req.query;
      const searchNameService = new SearchNameProductsService();

      const searchName = await searchNameService.execute(name, req.client.id);

      if (searchName.err) throw new Error(searchName.err);

      return res.status(200).json(searchName);
    }catch(err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listProductsService = new ListProductsService();

      const products = await listProductsService.execute();

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

      const product = await productService.execute(Number(id));

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

      const result = await deleteProductService.execute({ ...req.body, menu_id, product_id});

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default ProductController;
