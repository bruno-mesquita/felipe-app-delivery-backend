/**
 * @fileoverview Criação do schema de validação para criação do cliente
 * @author Bruno Mesquita
 */

import { object, SchemaOf, mixed, number, array } from 'yup';

import type { IProfileClientDto, Select } from '../dtos/profile-client.dto';

const schema: SchemaOf<IProfileClientDto> = object({
  id: number().integer().min(1).required(),
  selects: array().of(mixed().oneOf<Select>(['active', 'avatar', 'cpf', 'email', 'name']))
});

const profileClientValidate = (values: IProfileClientDto) => schema.validateSync(values, { stripUnknown: true });

export default profileClientValidate;
