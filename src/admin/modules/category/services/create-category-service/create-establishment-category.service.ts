
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateCategoryDtos } from '../../dtos/create-category.dtos';
import { schema } from '../../validation/create-category.validation';

export class CreateCategoryService {
  async execute(createCategoryDto: CreateCategoryDtos): Promise<ServiceResponse<string | null>> {
    try {
      // Validação

      const valid = schema.isValidSync(createCategoryDto);

      if (!valid) throw new Error('Dados inválidos.');

      const category = categoryRepository.create(createCategoryDto);

      await categoryRepository.save(category);

      return { result: category.id, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
