import { UpdateCategoryDtos } from '../../dtos/update-category.dtos';
import Category from '@core/schemas/category.schema';
import { schema } from '../../validation/update-category.validation';
import ApiError from '@shared/utils/ApiError';

export class UpdateCategoryService {
  async execute({ id, name }: UpdateCategoryDtos): Promise<void> {
    try {
      // validando dto
      const valid = schema.isValidSync({ id, name });

      if (!valid) throw new ApiError('Dados inválidos');

      // Verificando se essa existe uma categoria

      const category = await Category.findById(id);

      if (!category) throw new ApiError('Categoria não encontrada');

      // Criando classe e Salvando no DB
      await category.update({ name });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
