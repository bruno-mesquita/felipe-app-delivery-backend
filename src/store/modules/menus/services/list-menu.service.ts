import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListMenuService {
  async execute(establishmentId: number): Promise<ServiceResponse<Menu[]>> {
    try {
      const menus = await Menu.findAll({
        where: { establishment_id: establishmentId },
        attributes: ['id', 'name']
      });

      return { result: menus, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
