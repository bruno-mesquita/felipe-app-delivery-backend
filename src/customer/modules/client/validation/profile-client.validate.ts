/**
 * @fileoverview Criação do schema de validação para criação do cliente
 * @author Bruno Mesquita
 */

import { object, mixed, number, array } from 'yup';

import yupWrapper from '@shared/utils/yup-wrapper';

import type { IProfileClientDto, Select } from '../dtos';

export const profileClientValidate = yupWrapper<IProfileClientDto>(
  object({
    id: number().integer().min(1).required(),
    selects: array().of(
      mixed().oneOf<Select>([
        'active',
        'avatar',
        'cpf',
        'email',
        'name',
        'cellphone',
      ])
    ),
  })
);
