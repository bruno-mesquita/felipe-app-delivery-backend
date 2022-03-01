import Product from '@core/product';
import ApiError from '@shared/utils/ApiError';

import ProductRepository from '../product.repository';
import type { IFindOneOptions } from '../dtos';

export class FindOneProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async execute({ menuId, productId }: IFindOneOptions): Promise<Product> {
    try {
      return this.repository.findOne({
        menuId,
        productId,
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
