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
  async searchName({ client, query }: Request, res: Response): Promise<Response> {
    try {
      const searchNameProductsService = new SearchNameProductsService();
      const { search } = query;

      const establishmentId = client.entity.getEstablishmentId();

      const products = await searchNameProductsService.execute(search as string, establishmentId);

      if (products.err) throw new Error(products.err);

      return res.status(200).json(products);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list({ query, client }: Request, res: Response): Promise<Response> {
    try {
      const { page = 0, menuId } = query;

      const listProductsService = new ListProductsService();

      const establishmentId = client.entity.getEstablishmentId();

      const products = await listProductsService.execute(establishmentId, Number(page), menuId ? Number(menuId) : undefined);

      if (products.err) throw new Error(products.err);

      return res.status(200).json(products);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async show({ params, client }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;

      const productService = new ShowProductService();

      const establishmentId = client.entity.getEstablishmentId();

      const product = await productService.execute(Number(id), establishmentId);

      if (product.err) throw new Error(product.err);

      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      const createProductService = new CreateProductService();

      const product = await createProductService.execute(body);

      if (product.err) throw new Error(product.err);

      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async update({ params, body }: Request, res: Response) {
    try {
      const { id } = params;
      const updateProductService = new UpdateProductService();

      const updateProduct = await updateProductService.execute({
        ...body,
        id,
      });

      if (updateProduct.err) throw new Error(updateProduct.err);

      return res.status(200).json(updateProduct);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async delete({ params, client }: Request, res: Response) {
    try {
      const { menu_id, product_id } = params;
      const deleteProductService = new DeleteProductService();

      const establishmentId = client.entity.getEstablishmentId();

      const result = await deleteProductService.execute({
        menuId: Number(menu_id),
        productId: Number(product_id),
        establishmentId: establishmentId
      });

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export default ProductController;
