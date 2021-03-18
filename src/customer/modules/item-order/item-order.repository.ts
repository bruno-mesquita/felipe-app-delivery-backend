import { EntityRepository, Repository } from 'typeorm';
import ItemOrder from '../../../core/item-order';

@EntityRepository(ItemOrder)
class ItemOrderRepository extends Repository<ItemOrder> {
  async findById(id: string): Promise<ItemOrder | undefined> {
    const itemOrder = await this.findOne({
      where: { id },
    });

    return itemOrder;
  }
}

export { ItemOrderRepository };
