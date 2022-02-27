import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListMenusByEstablishmentService {
  async execute(establishmentId: number): Promise<ServiceResponse<Menu[]>> {
    try {
      const menus = await Menu.findAll({
        where: { establishment_id: establishmentId, active: true },
        attributes: ['id', 'name'],
        order: [['priority', 'ASC']],
      });

      return { result: menus, err: null };
    } catch (err) {
      return { result: [], err: 'Erro' };
    }
  }
}
