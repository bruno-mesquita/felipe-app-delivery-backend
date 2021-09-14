/**
 * @fileoverview Criação do schema de validação para criação do cliente
 * @author Bruno Mesquita
 */

import { object, SchemaOf, string, number } from 'yup';

import { CreateClientDto } from '../dtos/create-client-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateClientDto> = object({
  name: string().required(REQUIRED),
  email: string().email('Email inválido').required(REQUIRED),
  password: string().required(REQUIRED),
  confirmPassword: string().required(REQUIRED),
  cpf: string().length(11).required(REQUIRED),
  cellphone: string().required(REQUIRED),
  city: number().integer().min(1).required(REQUIRED),
});

export default schema;
