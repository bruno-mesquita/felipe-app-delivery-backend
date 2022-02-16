import ApiError from '@shared/utils/ApiError';
import Menu from '@core/menu';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListMenuService {
  async execute(establishmentId: number): Promise<ServiceResponse<Menu[]>> {
    try {
      const menus = await Menu.findAll({
        where: { establishment_id: establishmentId },
        attributes: ['id', 'name'],
        order: [['createdAt', 'ASC']]
      });

      return { result: menus, err: null };
    } catch (err) {
      throw new ApiError('Erro ao buscar menus', 'unknown', 500);
    }
  }
}
