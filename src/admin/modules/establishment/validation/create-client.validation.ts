/**
 * @fileoverview Criação do schema de validação para criação do estabelecimento
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { object, SchemaOf, string, number, array, boolean } from 'yup';

import { CreateEstablishmentDto } from '../dtos/create-establishment-dto';

const REQUIRED = 'Campo obrigátorio';

const phoneRegxp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

const schema: SchemaOf<CreateEstablishmentDto> = object({
  name: string().required(REQUIRED),
  email: string().email('Email inválido').required(REQUIRED),
  password: string().required(REQUIRED),
  active: boolean().required(REQUIRED),
  cellphone: string().required(REQUIRED).matches(phoneRegxp, 'Telefone inválido'),
  openingTime: number().min(0).max(23).required(REQUIRED),
  closingTime: number().required(REQUIRED),
  freightValue: number().required(REQUIRED),
  image: string().required(REQUIRED),
  categories: array().of(number().integer().required(REQUIRED)),
  address: object({
    street: string().required(REQUIRED),
    number: number().required(REQUIRED),
    neighborhood: string().required(REQUIRED),
    cep: string().required(REQUIRED),
    city: number().integer().required(REQUIRED),
  }),
});

export default schema;
