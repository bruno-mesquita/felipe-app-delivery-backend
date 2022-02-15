import { object, SchemaOf, string, number } from 'yup';

import ApiError from '@shared/utils/ApiError';
import { UpdateMenuDto } from '../dtos/update-menu.dto';

const schema: SchemaOf<UpdateMenuDto> = object({
  id: number().integer().min(1).required(),
  name: string().trim().required(),
  establishmentId: number().integer().min(1).required(),
});

export const updateMenuValidate = (values: UpdateMenuDto) => {
  try {
    return schema.validateSync(values, { stripUnknown: true });
  } catch (err) {
    throw new ApiError('Erro de validação!', 'validate');
  }
}
