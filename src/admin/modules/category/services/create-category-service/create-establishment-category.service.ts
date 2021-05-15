import Category from '@core/category';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateCategoryDtos } from '../../dtos/create-category.dtos';
import { schema } from '../../validation/create-category.validation';

export class CreateCategoryService {
  async execute(createCategoryDto: CreateCategoryDtos): Promise<ServiceResponse<any | null>> {
    try {
      // Validação
      const valid = schema.isValidSync(createCategoryDto);

      if (!valid) throw new Error('Dados inválidos.');

      // Verificando se já existe esse nome

      const categoryExists = await Category.findOne({
        where: { name: createCategoryDto.name }
      });

      if (categoryExists) throw new Error('Categoria já cadastrada');

      // Criando Classe e Salvando

      const category = await Category.create(createCategoryDto);

      return { result: category.id, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
