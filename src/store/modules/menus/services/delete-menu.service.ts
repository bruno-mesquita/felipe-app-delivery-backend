import { EstablishmentOwner } from '@core/establishment-owner';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';
import { DeleteMenuDto } from '../dtos/delete-menu.dto';

export class DeleteMenuService {
  async execute({ id, ownerId }: DeleteMenuDto): Promise<ServiceResponse<boolean | null>> {
    try {
      // Verificar se o estabelecimento existe
      const owner = await EstablishmentOwner.findByPk(ownerId);

      if (!owner) throw new Error('Estabelicimento não encontrado.');

      // Verificando se o menu já existe cadastrado
      const menu = await Menu.findOne({
        where: { id, establishment_id: owner.establishment_id },
      });

      if (!menu) throw new Error('Menu não encontrado');

      await menu.destroy();

      return { result: true, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
