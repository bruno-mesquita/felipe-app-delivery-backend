/**

 * @fileoverview Criação do schema de validação para criação do Endereço

 *

 * @author Jonatas Rosa Moura

 */

import { object, SchemaOf, string, number } from 'yup';

import { CreateAddressDto } from '../dtos/create-address-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateAddressDto> = object({
  street: string().required(REQUIRED),

  number: number().required(REQUIRED),

  neighborhood: string().required(REQUIRED),

  cep: string().length(8).required(REQUIRED),

  // city: string().required(REQUIRED),
});

export default schema;
