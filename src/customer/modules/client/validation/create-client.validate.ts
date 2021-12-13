/**
 * @fileoverview Criação do schema de validação para criação do cliente
 * @author Bruno Mesquita
 */

import { object, string, number } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';

import { ICreateClientDto } from '../dtos';

export const createClientValidate = yupWrapper<ICreateClientDto>(object({
  name: string().trim().required(),
  email: string().trim().email().required(),
  password: string().trim().required(),
  confirmPassword: string().trim().required(),
  cpf: string().trim().length(11).required(),
  cellphone: string().trim().required(),
  city: number().integer().min(1).required(),
}))

