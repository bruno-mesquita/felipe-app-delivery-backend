import type { SchemaOf } from 'yup';
import ApiError from './ApiError';

const yupWrapper = <T>(schema: SchemaOf<T>) => (values: T) => {
  try {
    return schema.validateSync(values, { stripUnknown: true });
  } catch (err) {
    throw new ApiError('Erro de validação!', 'validate');
  }
}

export default yupWrapper;
