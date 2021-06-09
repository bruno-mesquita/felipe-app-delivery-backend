import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';

export class GetMenuService {
  async execute(establishmentId: number, menuId: string): Promise<ServiceResponse<Menu | null>> {
    try {
      const menu = await Menu.findOne({ where: { id: menuId, establishment_id: establishmentId } });

      if (!menu) throw new Error('Menu não encontrado.');

      return { result: menu, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
