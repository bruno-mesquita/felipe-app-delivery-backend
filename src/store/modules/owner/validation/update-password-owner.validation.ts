/**
 * @fileoverview Criação do schema de validação para atualização da senha do cliente
 *
 * @author Bruno Mesquita
 */

import { object, SchemaOf, string, number } from 'yup';

import { UpdatePasswordEstablishmentDto } from '../dtos/update-password-owner-dto';

const schema: SchemaOf<UpdatePasswordEstablishmentDto> = object({
  id: number().integer().required(),
  currentPassword: string().trim().required(),
  newPassword: string().trim().required(),
  confirmNewPassword: string().trim().required(),
});

export default schema;
