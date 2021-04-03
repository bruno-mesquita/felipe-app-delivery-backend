import { ServiceResponse } from '@shared/utils/service-response';
import { createMenuStablishmentDto } from '../dtos/create-menu.dtos';
import validateMenuCreation from '../validations/create-menu.validation';

export class CreateMenuService {
  async execute(createMenuDto: createMenuStablishmentDto): Promise<ServiceResponse<any | null>> {
    try {
      const menuRepository = getCustomRepository(MenuRepository);
      const establishmentRepository = getCustomRepository(EstablishmentRepository);

      // Validandos os dados

      const valid = validateMenuCreation.isValidSync(createMenuDto);

      if (!valid) throw new Error('Dados inválidos.');

      // Verificar se o estabelecimento existe.

      const establishment = await establishmentRepository.findById(createMenuDto.establishment);

      if (!establishment) throw new Error('Estabelicimento não encontrado.');

      // Criando Classe

      const menu = menuRepository.create({
        ...createMenuDto,
        establishment,
      });

      await menuRepository.save(menu);

      return { result: menu, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
