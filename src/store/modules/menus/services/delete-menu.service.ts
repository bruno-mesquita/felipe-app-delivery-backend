import ApiError from '@shared/utils/ApiError';
import { IDeleteMenuDto } from '../dtos';
import MenuRepository from '../menu.repository';

export class DeleteMenuService {
  private repository: MenuRepository;

  constructor() {
    this.repository = new MenuRepository();
  }

  async execute({ id, establishmentId }: IDeleteMenuDto): Promise<void> {
    try {
      await this.repository.deleteOne({
        establishmentId,
        id,
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
