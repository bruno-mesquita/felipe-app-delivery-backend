/**
 * @fileoverview Criação do schema de validação para criação do estabelecimento
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { object, SchemaOf, string, number, array, boolean } from 'yup';

import { CreateEstablishmentDto } from '../dtos/create-establishment-dto';

const phoneRegxp =
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

const schema: SchemaOf<CreateEstablishmentDto> = object({
  name: string().trim().required(),
  cellphone: string()
    .trim()
    .required()
    .matches(phoneRegxp, 'Telefone inválido'),
  openingTime: number().min(0).max(23).required(),
  closingTime: number().required(),
  freightValue: number().required(),
  image: string().trim().required(),
  categories: array().of(number().integer().required()),
  userId: number().required(),
  address: object({
    street: string().trim().required(),
    number: string().trim().required(),
    neighborhood: string().trim().required(),
    cep: string().trim().required(),
    city: number().integer().required(),
  }),
});

export default schema;
