import ApiError from '@shared/utils/ApiError';
import { IUpdateMenuDto } from '../dtos';
import MenuRepository from '../menu.repository';

export class UpdateMenuService {
  private repository: MenuRepository;

  constructor() {
    this.repository = new MenuRepository();
  }

  async execute(model: IUpdateMenuDto): Promise<void> {
    try {
      this.repository.updateOne(model);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
