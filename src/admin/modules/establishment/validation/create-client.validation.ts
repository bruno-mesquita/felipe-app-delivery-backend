/**
 * @fileoverview Criação do schema de validação para criação do estabelecimento
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { object, SchemaOf, string, number } from 'yup';

import { CreateEstablishmentDto } from '../dtos/create-establishment-dto';

const REQUIRED = 'Campo obrigátorio';

const phoneRegxp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

const schema: SchemaOf<CreateEstablishmentDto> = object({
  name: string().required(REQUIRED),
  email: string().email('Email inválido').required(REQUIRED),
  password: string().required(REQUIRED),
  confirmPassword: string().required(REQUIRED),
  cellphone: string().required(REQUIRED).matches(phoneRegxp, 'Telefone inválido'),
  openingTime: number().min(0).max(23).required(REQUIRED),
  closingTime: number().required(REQUIRED),
  image: object({
    name: string().required(REQUIRED),
    encoded: string().required(REQUIRED),
  }),
  category: string().uuid().required(REQUIRED),
});

export default schema;
