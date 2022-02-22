import Menu from '@core/menu';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

import { FindOneMenuDto } from '../dtos/find-one-menu.dto';

export class GetMenuService {
  async execute({
    establishmentId,
    id,
  }: FindOneMenuDto): Promise<ServiceResponse<Menu | null>> {
    try {
      const menu = await Menu.findOne({
        where: { id, establishment_id: establishmentId },
      });

      if (!menu) throw new ApiError('Menu não encontrado.');

      return { result: menu, err: null };
    } catch (err) {
      if (err instanceof ApiError) throw err;

      throw new ApiError('Erro ao buscar o menu', 'unknown');
    }
  }
}
