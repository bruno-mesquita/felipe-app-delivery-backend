import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateCategoryDtos } from '../../dtos/update-category.dtos';
import Category from '@core/category';
import { schema } from '../../validation/update-category.validation';
import ApiError from '@shared/utils/ApiError';

export class UpdateCategoryService {
  async execute(updateCategoryDto: UpdateCategoryDtos): Promise<ServiceResponse<boolean>> {
    try {
      // validando dto
      const valid = schema.isValidSync(updateCategoryDto);

      if (!valid) throw new ApiError('Dados inválidos');

      // Verificando se essa existe uma categoria

      const category = await Category.findByPk(updateCategoryDto.id);

      if (!category) throw new ApiError('Categoria não encontrada');

      // Verificando se já existe com esse nome

      const categoryExists = await Category.findOne({
        where: {name: updateCategoryDto.name}
      });

      if (categoryExists) throw new ApiError('Nome de Categoria já existente');

      // Criando classe e Salvando no DB

      const { name } = updateCategoryDto;

      category.setName(name);

      await category.save();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
