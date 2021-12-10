/**
 * @fileoverview Criação do schema de validação para atualização da senha do cliente
 *
 * @author Bruno Mesquita
 */

import { object, string, number } from 'yup';

import type { UpdatePasswordClientDto } from '../dtos/update-password-client-dto';
import yupWrapper from '@shared/utils/yup-wrapper';

export const updatePasswordValidate = yupWrapper<UpdatePasswordClientDto>(object({
  id: number().integer().positive().required(),
  currentPassword: string().trim().required(),
  newPassword: string().trim().required(),
  confirmNewPassword: string().trim().required(),
}))
