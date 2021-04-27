import Establishment from '@core/establishment';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';

export class GetMenuService {
  async execute(establishmentId: number, menuId: string): Promise<ServiceResponse<Menu | null>> {
    try {
      // Verificar se o estabelecimento existe.
      const establishment = await Establishment.findByPk(establishmentId);
      const menu = await Menu.findByPk(menuId);

      if (!establishment) throw new Error('Estabelicimento não encontrado.');

      if (!menu) throw new Error('Menu não encontrado.');

      return { result: menu, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
