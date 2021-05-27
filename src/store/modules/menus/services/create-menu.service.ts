import { EstablishmentOwner } from '@core/establishment-owner';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';
import { createMenuStablishmentDto } from '../dtos/create-menu.dtos';
import validateMenuCreation from '../validations/create-menu.validation';

export class CreateMenuService {
  async execute(createMenuDto: createMenuStablishmentDto): Promise<ServiceResponse<boolean | null>> {
    try {
      // Validandos os dados
      const valid = validateMenuCreation.isValidSync(createMenuDto);

      if (!valid) throw new Error('Dados inválidos.');

      // Verificar se o estabelecimento existe.
      const owner = await EstablishmentOwner.findByPk(createMenuDto.owner);

      if (!owner) throw new Error('Estabelicimento não encontrado.');

      // Criando Classe
      await Menu.create({
        ...createMenuDto,
        establishment_id: owner.establishment_id,
      });

      return { result: true, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
