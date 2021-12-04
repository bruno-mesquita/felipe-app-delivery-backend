/**
 * @fileoverview Criação do schema de validação para atualização da senha do cliente
 *
 * @author Bruno Mesquita
 */

import { object, SchemaOf, string, number } from 'yup';

import { UpdatePasswordClientDto } from '../dtos/update-password-client-dto';

const schema: SchemaOf<UpdatePasswordClientDto> = object({
  id: number().integer().positive().required(),
  currentPassword: string().required(),
  newPassword: string().required(),
  confirmNewPassword: string().required(),
});

const updatePasswordValidate = (values: UpdatePasswordClientDto) => schema.validateSync(values, { stripUnknown: true });

export default updatePasswordValidate;
