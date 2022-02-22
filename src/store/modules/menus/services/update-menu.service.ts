import ApiError from '@shared/utils/ApiError';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateMenuDto } from '../dtos/update-menu.dto';

export class UpdateMenuService {
  async execute({
    establishmentId,
    id,
    ...modelDto
  }: UpdateMenuDto): Promise<ServiceResponse<boolean | null>> {
    try {
      // Verificando se o menu já existe cadastrado
      const menu = await Menu.findOne({
        where: { id, establishment_id: establishmentId },
      });

      if (!menu) throw new ApiError('Menu não encontrado');

      menu.update(modelDto);

      return { result: true, err: null };
    } catch (err) {
      if (err instanceof ApiError) throw err;

      throw new ApiError('Erro ao atualizar menu', 'unknown', 500);
    }
  }
}
