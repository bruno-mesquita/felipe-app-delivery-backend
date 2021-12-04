import { object, SchemaOf, string, number } from 'yup';

import ApiError from '@shared/utils/ApiError';
import { CreateMenuDto } from '../dtos/create-menu.dtos';

const schema: SchemaOf<CreateMenuDto> = object({
  name: string().trim().required(),
  establishmentId: number().integer().min(1).required(),
});

export const createMenuValidate = (values: CreateMenuDto) => {
  try {
    return schema.validateSync(values, { stripUnknown: true });
  } catch (err) {
    throw new ApiError('Erro de validação!', 'validate');
  }
}
