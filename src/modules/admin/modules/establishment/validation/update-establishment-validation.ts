/**

 * @fileoverview Criação do schema de validação para atualização do estabelecimento

 * @author Jonatas Rosa Moura

*/

import { object, SchemaOf, string } from 'yup';

import { UpdateEstablishmentDto } from '../dtos/update-establishment-dto';

const REQUIRED = 'Campo obrigátorio';

const phoneRegxp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

const schema: SchemaOf<UpdateEstablishmentDto> = object({
  id: string().required(REQUIRED),

  name: string().required(REQUIRED),

  email: string().email('Email inválido').required(REQUIRED),

  cellphone: string().required(REQUIRED).matches(phoneRegxp, 'Telefone inválido'),
});

export default schema;
