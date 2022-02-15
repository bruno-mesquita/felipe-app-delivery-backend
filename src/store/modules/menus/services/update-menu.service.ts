import ApiError from '@shared/utils/ApiError';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateMenuDto } from '../dtos/update-menu.dto';

export class UpdateMenuService {
  async execute(updateMenuDto: UpdateMenuDto): Promise<ServiceResponse<boolean | null>> {
    try {
      // Verificando se o menu já existe cadastrado
      const menu = await Menu.findOne({
        where: { id: updateMenuDto.id, establishment_id: updateMenuDto.establishmentId },
      });

      if (!menu) throw new ApiError('Menu não encontrado');

      menu.setName(updateMenuDto.name);

      await menu.save();

      return { result: true, err: null };
    } catch (err) {
      if(err instanceof ApiError) throw err;

      throw new ApiError('Erro ao atualizar menu', 'unknown', 500);
    }
  }
}
