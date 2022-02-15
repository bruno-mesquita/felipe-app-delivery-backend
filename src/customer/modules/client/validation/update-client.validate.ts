/**
 * @fileoverview Criação do schema de validação para atualização do cliente
 *
 * @author Bruno Mesquita
 */

import { object, string, number } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';
import { IUpdateClientDto } from '../dtos';

export const updateClientValidate = yupWrapper<IUpdateClientDto>(object({
  id: number().integer().positive().required(),
  name: string().trim().required(),
  email: string().trim().email().required(),
  cellphone: string().trim().required(),
}));
