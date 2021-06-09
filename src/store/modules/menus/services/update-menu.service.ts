import { EstablishmentOwner } from '@core/establishment-owner';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateMenuStablishmentDto } from '../dtos/update-menu.dto';
import validateMenuUpdate from '../validations/update-menu.validation';

export class UpdateMenuService {
  async execute(updateMenuDto: UpdateMenuStablishmentDto): Promise<ServiceResponse<boolean | null>> {
    try {
      // Validandos os dados
      const valid = validateMenuUpdate.isValidSync(updateMenuDto);

      if (!valid) throw new Error('Dados inválidos.');

      // Verificando se o menu já existe cadastrado
      const menu = await Menu.findOne({
        where: { id: updateMenuDto.id, establishment_id: updateMenuDto.establishmentId },
      });

      if (!menu) throw new Error('Menu não encontrado');

      menu.setName(updateMenuDto.name);

      await menu.save();

      return { result: true, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
