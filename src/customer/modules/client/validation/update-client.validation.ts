/**
 * @fileoverview Criação do schema de validação para atualização do cliente
 *
 * @author Bruno Mesquita
 */

import { object, SchemaOf, string, number } from 'yup';

import { UpdateClientDto } from '../dtos/update-client-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdateClientDto> = object({
  id: number().integer().positive().required(),
  name: string().required(),
  email: string().email().required(),
  cellphone: string().required(),
});

export default schema;
