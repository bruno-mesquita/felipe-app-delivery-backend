import Menu from '@core/menu';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateMenuDto } from '../dtos/create-menu.dtos';

export class CreateMenuService {
  async execute({ active, establishmentId, name }: CreateMenuDto): Promise<ServiceResponse<boolean | null>> {
    try {
      await Menu.create({
        name,
        active,
        establishment_id: establishmentId
      });

      return { result: true, err: null };
    } catch (err) {
      throw new ApiError('Erro ao criar menu');
    }
  }
}
