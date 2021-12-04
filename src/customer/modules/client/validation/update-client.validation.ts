/**
 * @fileoverview Criação do schema de validação para atualização do cliente
 *
 * @author Bruno Mesquita
 */

import { object, SchemaOf, string, number } from 'yup';

import { UpdateClientDto } from '../dtos/update-client-dto';

const schema: SchemaOf<UpdateClientDto> = object({
  id: number().integer().positive().required(),
  name: string().trim().required(),
  email: string().trim().email().required(),
  cellphone: string().trim().required(),
});


const updateClientValidate = (values: UpdateClientDto) => schema.validateSync(values, { stripUnknown: true });

export default updateClientValidate;
