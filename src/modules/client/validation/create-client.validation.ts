/**
 * @fileoverview Criação do schema de validação para criação do cliente
 *
 * @author Bruno Mesquita
 */

import { object, SchemaOf, string } from 'yup';

import { CreateClientDto } from '../dtos/create-client-dto';

const REQUIRED = 'Campo obrigátorio';

const phoneRegxp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

const schema: SchemaOf<CreateClientDto> = object({
  name: string().required(REQUIRED),
  email: string().email('Email inválido').required(REQUIRED),
  password: string().required(REQUIRED),
  confirmPassword: string().required(REQUIRED),
  cellphone: string().required(REQUIRED).matches(phoneRegxp, 'Telefone inválido'),
  cpf: string().length(11).required(REQUIRED),
});

export default schema;
