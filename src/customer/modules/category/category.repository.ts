import { EntityRepository, Repository } from 'typeorm';

import Category from '@core/category';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  async findById(id: string): Promise<Category | undefined> {
    try {
      return this.findOne({ where: { id } });
    } catch (err) {
      return undefined;
    }
  }
}

export default CategoryRepository;
