import { object, SchemaOf, number } from 'yup';

import ApiError from '@shared/utils/ApiError';
import { DeleteMenuDto } from '../dtos/delete-menu.dto';

const schema: SchemaOf<DeleteMenuDto> = object({
  id: number().integer().min(1).required(),
  establishmentId: number().integer().min(1).required(),
});

export const deleteMenuValidate = (values: DeleteMenuDto) => {
  try {
    return schema.validateSync(values, { stripUnknown: true });
  } catch (err) {
    throw new ApiError('Erro de validação!', 'validate');
  }
}
