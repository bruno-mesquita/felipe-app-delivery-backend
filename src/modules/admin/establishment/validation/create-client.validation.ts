/**

 * @fileoverview Criação do schema de validação para criação do estabelecimento

 *

 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura

 */

import { object, SchemaOf, string } from 'yup';

import { CreateEstablishmentDto } from '../dtos/create-establishment-dto';

const REQUIRED = 'Campo obrigátorio';

const phoneRegxp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

// estando <>
const schema: SchemaOf<CreateEstablishmentDto> = object({
  name: string().required(REQUIRED),

  email: string().email('Email inválido').required(REQUIRED),

  password: string().required(REQUIRED),

  confirmPassword: string().required(REQUIRED),

  cellphone: string().required(REQUIRED).matches(phoneRegxp, 'Telefone inválido'),
});

export default schema;
