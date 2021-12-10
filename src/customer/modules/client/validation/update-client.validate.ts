/**
 * @fileoverview Criação do schema de validação para atualização do cliente
 *
 * @author Bruno Mesquita
 */

import { object, string, number } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import { UpdateClientDto } from '../dtos/update-client-dto';

export const updateClientValidate = yupWrapper<UpdateClientDto>(object({
  id: number().integer().positive().required(),
  name: string().trim().required(),
  email: string().trim().email().required(),
  cellphone: string().trim().required(),
}));
