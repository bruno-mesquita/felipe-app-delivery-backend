/**
 * @fileoverview Criação do schema de validação para atualização da senha do cliente
 *
 * @author Bruno Mesquita
 */

import { object, SchemaOf, string, number } from 'yup';

import { UpdatePasswordEstablishmentDto } from '../dtos/update-password-owner-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdatePasswordEstablishmentDto> = object({
  id: number().integer().required(REQUIRED),
  currentPassword: string().required(REQUIRED),
  newPassword: string().required(REQUIRED),
  confirmNewPassword: string().required(REQUIRED),
});

export default schema;
