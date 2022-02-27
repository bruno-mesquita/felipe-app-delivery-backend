import Menu from '@core/menu';
import ApiError from '@shared/utils/ApiError';

import { IFindOneMenuDto } from '../dtos';
import MenuRepository from '../menu.repository';

export class GetMenuService {
  private repository: MenuRepository;

  constructor() {
    this.repository = new MenuRepository();
  }

  async execute({ establishmentId, id }: IFindOneMenuDto): Promise<Menu> {
    try {
      return this.repository.findOne({
        establishmentId,
        id,
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
