import Menu from '@core/menu';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { DeleteMenuDto } from '../dtos/delete-menu.dto';

export class DeleteMenuService {
  async execute({ id, establishmentId }: DeleteMenuDto): Promise<ServiceResponse<boolean | null>> {
    try {
      // Verificando se o menu já existe cadastrado
      const menu = await Menu.findOne({
        where: { id, establishment_id: establishmentId },
      });

      if (!menu) throw new ApiError('Menu não encontrado');

      await menu.destroy();

      return { result: true, err: null };
    } catch (err) {
      if(err instanceof ApiError) throw err;

      throw new ApiError('Erro ao buscar o menu', 'unknown');
    }
  }
}
