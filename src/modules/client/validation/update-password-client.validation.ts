/**
 * @fileoverview Criação do schema de validação para atualização da senha do cliente
 *
 * @author Bruno Mesquita
 */

import { object, SchemaOf, string } from 'yup';

import { UpdatePasswordClientDto } from '../dtos/update-password-client-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdatePasswordClientDto> = object({
  id: string().required(REQUIRED),
  password: string().required(REQUIRED),
  newPassword: string().required(REQUIRED),
});

export default schema;