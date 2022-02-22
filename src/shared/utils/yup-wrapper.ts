import type { SchemaOf } from 'yup';

import ApiError from './ApiError';

const yupWrapper =
  <T>(schema: SchemaOf<T>) =>
  (values: T): T => {
    try {
      return schema.validateSync(values, { stripUnknown: true }) as T;
    } catch (err) {
      throw new ApiError('Erro de validação!', 'validate');
    }
  };

export default yupWrapper;
