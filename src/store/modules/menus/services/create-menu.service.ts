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

      await Menu.create({
        ...createMenuDto,
        establishment_id: createMenuDto.establishmentId
      });

      return { result: true, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
