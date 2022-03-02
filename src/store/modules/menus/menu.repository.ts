import Menu from '@core/menu';
import ApiError from '@shared/utils/ApiError';

import type { TCreationAttributes } from '@core/menu';
import { createPagination } from '@shared/utils/use-page';
import type { IUpdateMenuDto } from './dtos';

type IFindOneOptions = {
  id: number;
  establishmentId: number;
};

type IDeleteOneOptions = IFindOneOptions;

type IFindAllOptions = { establishmentId: number; page: number };

class MenuRepository {
  async findOne({ establishmentId, id }: IFindOneOptions): Promise<Menu> {
    try {
      const menu = await Menu.findOne({
        where: {
          id,
          establishmentId,
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      });

      if (!menu) throw new ApiError('menu não encontrado');

      return menu;
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao buscar menu');
    }
  }

  async create(model: TCreationAttributes): Promise<Menu> {
    try {
      return Menu.create(model);
    } catch (err) {
      throw new ApiError('Erro ao criar menu');
    }
  }

  async updateOne({ id, establishmentId, ...model }: IUpdateMenuDto): Promise<void> {
    try {
      const menu = await this.findOne({ id, establishmentId });

      await menu.update({
        ...model,
        establishmentId,
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao atualizar menu');
    }
  }

  async deleteOne(options: IDeleteOneOptions): Promise<void> {
    try {
      const menu = await this.findOne(options);

      await menu.destroy();
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao deletar menu');
    }
  }

  async findAll({ establishmentId, page }: IFindAllOptions): Promise<Menu[]> {
    try {
      const { limit, offset } = createPagination(page - 1);

      const menus = await Menu.findAll({
        where: { establishmentId },
        attributes: ['id', 'name'],
        order: [['priority', 'ASC']],
        limit,
        offset,
      });

      return menus;
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao listar menu');
    }
  }
}

export default MenuRepository;
