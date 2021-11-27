/**
 * @fileoverview Criação do schema de validação para criação do cliente
 * @author Bruno Mesquita
 */

import { object, SchemaOf, string, number } from 'yup';

import { CreateClientDto } from '../dtos/create-client-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateClientDto> = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
  confirmPassword: string().required(),
  cpf: string().length(11).required(),
  cellphone: string().required(),
  city: number().integer().min(1).required(),
});

export default schema;
