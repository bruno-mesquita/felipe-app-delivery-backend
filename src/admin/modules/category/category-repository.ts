import { EntityRepository, Repository } from 'typeorm';

import Category from '@core/category';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }
}
