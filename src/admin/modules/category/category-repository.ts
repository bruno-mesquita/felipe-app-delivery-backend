import { EntityRepository, Repository } from 'typeorm';

import Category from '@core/category';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }
}

export default CategoryRepository;
