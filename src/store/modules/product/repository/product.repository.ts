/**



 * @fileoverview Criação do schema de validação para criação do produto



 *



 * @author Bruno Mesquita

 * @author Jonatas Rosa Moura



 */

import { EntityRepository, Repository } from 'typeorm';

import Product from '@core/product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findById(id: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        id,
      },
    });

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findByPrice(price: number): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        price,
      },
    });

    return product;
  }
}
