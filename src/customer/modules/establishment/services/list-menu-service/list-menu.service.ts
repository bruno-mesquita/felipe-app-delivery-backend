import { MenuRepository } from '@customer/modules/menus/menu-repository';
import { ServiceResponse } from '@shared/utils/service-response';
import { getCustomRepository } from 'typeorm';

export class ListMenuService {
  async execute(id: string): Promise<ServiceResponse<any[] | null>> {
    try {
      const menuRepository = getCustomRepository(MenuRepository);

      const menus = await menuRepository.findOne({
        where: { id },
        select: ['id', 'name'],
      });

      return { result: [menus], err: null };
    } catch (err) {
      return { result: [null], err: err.message };
    }
  }
}
