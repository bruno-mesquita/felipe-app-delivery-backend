import { object, SchemaOf, number } from 'yup';

import ApiError from '@shared/utils/ApiError';
import { FindOneMenuDto } from '../dtos/find-one-menu.dto';

const schema: SchemaOf<FindOneMenuDto> = object({
  id: number().integer().min(1).required(),
  establishmentId: number().integer().min(1).required(),
});

export const findOneMenuValidate = (values: FindOneMenuDto) => {
  try {
    return schema.validateSync(values, { stripUnknown: true });
  } catch (err) {
    throw new ApiError('Erro de validação!', 'validate');
  }
};
