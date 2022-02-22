import Category from '@core/category';
import ApiError from '@shared/utils/ApiError';
import { UpdateCategoryDtos } from '../../dtos/update-category.dtos';
import { schema } from '../../validation/update-category.validation';

export class UpdateCategoryService {
  async execute({ id, name }: UpdateCategoryDtos): Promise<void> {
    try {
      // validando dto
      const valid = schema.isValidSync({ id, name });

      if (!valid) throw new ApiError('Dados inválidos');

      // Verificando se essa existe uma categoria

      const category = await Category.findByPk(id);

      if (!category) throw new ApiError('Categoria não encontrada');

      // Criando classe e Salvando no DB
      await category.update({ name });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
