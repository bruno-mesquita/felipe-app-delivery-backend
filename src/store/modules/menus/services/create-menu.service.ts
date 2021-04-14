import Establishment from '@core/establishment';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';
import { createMenuStablishmentDto } from '../dtos/create-menu.dtos';
import validateMenuCreation from '../validations/create-menu.validation';

export class CreateMenuService {
  async execute(createMenuDto: createMenuStablishmentDto): Promise<ServiceResponse<boolean | null>> {
    try {
      console.log(createMenuDto);
      // Validandos os dados
      const valid = validateMenuCreation.isValidSync(createMenuDto);

      if (!valid) throw new Error('Dados inválidos.');

      // Verificar se o estabelecimento existe.

      const establishment = await Establishment.findByPk(createMenuDto.establishment);

      if (!establishment) throw new Error('Estabelicimento não encontrado.');

      // Verificando se o menu já existe cadastrado

      const menuExists = await Menu.findOne({
        where: { name: createMenuDto.name, establishment_id: createMenuDto.establishment },
      });

      if (menuExists) throw new Error('Menu já cadastrado no sistema');

      // Criando Classe

      await Menu.create({
        ...createMenuDto,
        establishment_id: establishment.id,
      });

      return { result: true, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
