/**
 * @fileoverview Criação do schema de validação para criação do cliente
 * @author Bruno Mesquita
 */

import { object, SchemaOf, string, number, ValidationError } from 'yup';

import ApiError from '@shared/utils/ApiError';

import { CreateClientDto } from '../dtos/create-client-dto';

const schema: SchemaOf<CreateClientDto> = object({
  name: string().trim().required(),
  email: string().trim().email().required(),
  password: string().trim().required(),
  confirmPassword: string().trim().required(),
  cpf: string().trim().length(11).required(),
  cellphone: string().trim().required(),
  city: number().integer().min(1).required(),
});

const createClientValidation = (values: CreateClientDto) => {
  try {
    return schema.validateSync(values, { stripUnknown: true })
  } catch(err) {
    if(err instanceof ValidationError) {
      throw new ApiError('Dados invalidos!', 'validate', 400);
    }

    throw new ApiError('Dados invalidos!', 'validate', 400);
  }
};

export default createClientValidation;
