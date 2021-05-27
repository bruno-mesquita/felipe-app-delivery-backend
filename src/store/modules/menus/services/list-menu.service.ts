import Establishment from '@core/establishment';
import { EstablishmentOwner } from '@core/establishment-owner';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListMenuService {
  async execute(ownerId: number): Promise<ServiceResponse<Menu[]>> {
    try {
      // Verificar se o estabelecimento existe.
      const owner = await EstablishmentOwner.findOne({
        where: { id: ownerId },
        include: [{
          model: Establishment,
          attributes: ['id'],
        }],
      });

      if (!owner) throw new Error('Estabelicimento não encontrado.');

      // Verificando se o menu já existe cadastrado
      const menus = await owner.establishment.getMenus({ attributes: ['id', 'name'] })

      return { result: menus, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
