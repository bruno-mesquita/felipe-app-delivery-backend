import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateCategoryDtos } from '../../dtos/update-category.dtos';
import { schema } from '../../validation/update-category.validation';

export class UpdateCategoryService {
  async execute(updateCategoryDto: UpdateCategoryDtos): Promise<ServiceResponse<boolean>> {
    try {
      const categoryRepository = getCustomRepository(CategoryRepository);

      // validando dto

      const valid = schema.isValidSync(updateCategoryDto);

      if (!valid) throw new Error('Dados inválidos');

      // Verificando se essa existe uma categoria

      const category = await categoryRepository.findById(updateCategoryDto.id);

      if (!category) throw new Error('Categoria não encontrada');

      // Verificando se já existe com esse nome

      const categoryExists = await categoryRepository.findByName(updateCategoryDto.name);

      if (categoryExists) throw new Error('Nome de Categoria já existente');

      // Criando classe e Salvando no DB

      const { name } = updateCategoryDto;

      category.setName(name);

      await categoryRepository.save(category);

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}
