import Menu from '@core/menu';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Menu)
class MenuRepository extends Repository<Menu> {
  async findById(id: string) {
    return this.findOne({ where: { id } });
  }
}

export { MenuRepository };
