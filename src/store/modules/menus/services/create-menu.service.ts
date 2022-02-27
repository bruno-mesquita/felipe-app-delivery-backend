import ApiError from '@shared/utils/ApiError';

import type { ICreateMenuDto } from '../dtos';
import MenuRepository from '../menu.repository';

export class CreateMenuService {
  private repository: MenuRepository;

  constructor() {
    this.repository = new MenuRepository();
  }

  async execute({ establishmentId, ...rest }: ICreateMenuDto): Promise<number> {
    try {
      const menu = await this.repository.create({
        ...rest,
        establishment_id: establishmentId,
      });

      return menu.getId();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
