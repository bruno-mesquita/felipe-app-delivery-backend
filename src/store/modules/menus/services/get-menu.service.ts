import { EstablishmentOwner } from '@core/establishment-owner';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';

export class GetMenuService {
  async execute(ownerId: number, menuId: string): Promise<ServiceResponse<Menu | null>> {
    try {
      // Verificar se o estabelecimento existe.
      const owner = await EstablishmentOwner.findOne({
        where: { id: ownerId, active: true },
        attributes: ['establishment_id']
      });

      if (!owner) throw new Error('Estabelicimento não encontrado.');

      const menu = await Menu.findOne({ where: { id: menuId, establishment_id: owner.establishment_id } });

      if (!menu) throw new Error('Menu não encontrado.');

      return { result: menu, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
