import ApiError from '@shared/utils/ApiError';
import Menu from '@core/menu';
import MenuRepository from '../menu.repository';

export class ListMenuService {
  private repository: MenuRepository;

  constructor() {
    this.repository = new MenuRepository();
  }

  async execute({ establishmentId, page }): Promise<Menu[]> {
    try {
      return this.repository.findAll({
        establishmentId,
        page,
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
