import Category from '@core/schemas/category.schema';
import ApiError from '@shared/utils/ApiError';
import { CreateCategoryDto } from '../../dtos/create-category.dtos';
import { schema } from '../../validation/create-category.validation';

export class CreateCategoryService {
  async execute(createCategoryDto: CreateCategoryDto): Promise<string> {
    try {
      // Validação
      const valid = schema.isValidSync(createCategoryDto);

      if (!valid) throw new ApiError('Dados inválidos.');

      // Verificando se já existe esse nome

      const categoryExists = await Category.findOne({ name: createCategoryDto.name });

      if (categoryExists) throw new ApiError('Categoria já cadastrada');

      // Criando Classe e Salvando
      const category = await Category.create(createCategoryDto);

      return category._id.toHexString();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
