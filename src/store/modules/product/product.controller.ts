import type { Request, Response } from 'express';

import ApiError from '@shared/utils/ApiError';

import Controller from '@shared/utils/controller';
import {
  CreateProductService,
  DeleteProductService,
  ListProductsService,
  ShowProductService,
  UpdateProductService,
  SearchNameProductsService,
} from './services';

import {
  createProductValidate,
  updateProductValidate,
  deleteProductValidate,
  searchNameProductValidate,
  showProductValidate,
} from './validation';

class ProductController extends Controller {
  constructor() {
    super(['searchName', 'list', 'show', 'create', 'update', 'delete']);
  }

  async searchName(
    { client, query }: Request,
    res: Response
  ): Promise<Response> {
    try {
      const sanitizedValues = searchNameProductValidate({
        establishmentId: client.entity.getEstablishmentId(),
        search: query.search as string,
      });

      const searchNameProductsService = new SearchNameProductsService();

      const products = await searchNameProductsService.execute(
        sanitizedValues as any
      );

      return res.json(products);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async list({ query, client }: Request, res: Response): Promise<Response> {
    try {
      const { page = 0, menuId } = query;

      const listProductsService = new ListProductsService();

      const establishmentId = client.entity.getEstablishmentId();

      const products = await listProductsService.execute(
        establishmentId,
        Number(page),
        menuId ? Number(menuId) : undefined
      );

      return res.status(200).json(products);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async show({ params, client }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;

      const sanitizedValues = showProductValidate({
        id: Number(id),
        establishmentId: client.entity.getEstablishmentId(),
      });

      const productService = new ShowProductService();

      const product = await productService.execute(sanitizedValues as any);

      return res.json(product);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      const sanitizedValues = createProductValidate(body);

      const createProductService = new CreateProductService();

      const product = await createProductService.execute(
        sanitizedValues as any
      );

      return res.status(201).json(product);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async update({ params, body }: Request, res: Response) {
    try {
      const { id } = params;
      const sanitizedValues = updateProductValidate({ id, ...body });

      const updateProductService = new UpdateProductService();

      await updateProductService.execute(sanitizedValues);

      return res.status(204).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async delete({ params, client }: Request, res: Response) {
    try {
      const { menu_id, product_id } = params;

      const sanitizedValues = deleteProductValidate({
        establishmentId: client.entity.getEstablishmentId(),
        menuId: Number(menu_id),
        productId: Number(product_id),
      });
      const deleteProductService = new DeleteProductService();

      const result = await deleteProductService.execute(sanitizedValues as any);

      return res.json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default ProductController;
