import Establishment from '@core/establishment';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListMenuService {
  async execute(establishmentId: number): Promise<ServiceResponse<Menu[]>> {
    try {
      // Verificar se o estabelecimento existe.
      const establishment = await Establishment.findByPk(establishmentId);

      if (!establishment) throw new Error('Estabelicimento não encontrado.');

      // Verificando se o menu já existe cadastrado
      const menus = await establishment.getMenus({ attributes: ['id', 'name'] })

      return { result: menus, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
