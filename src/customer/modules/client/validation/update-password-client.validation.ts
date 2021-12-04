/**
 * @fileoverview Criação do schema de validação para atualização da senha do cliente
 *
 * @author Bruno Mesquita
 */

import { object, SchemaOf, string, number } from 'yup';

import { UpdatePasswordClientDto } from '../dtos/update-password-client-dto';

const schema: SchemaOf<UpdatePasswordClientDto> = object({
  id: number().integer().positive().required(),
  currentPassword: string().trim().required(),
  newPassword: string().trim().required(),
  confirmNewPassword: string().trim().required(),
});

const updatePasswordValidate = (values: UpdatePasswordClientDto) => schema.validateSync(values, { stripUnknown: true });

export default updatePasswordValidate;
