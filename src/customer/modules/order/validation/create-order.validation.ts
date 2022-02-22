/**
 * @fileoverview Criação do schema de validade para criação de pedidos
 * @author Jonatas Rosa Moura
 */

import { FormOfPaymentType } from '@core/order/order.types';
import { object, SchemaOf, number, string, array, mixed } from 'yup';
import { CreateOrderDto } from '../dtos/create-order.dto';

export const schema: SchemaOf<CreateOrderDto> = object({
  establishment_id: number().positive().integer().required(),
  client_id: number().positive().integer().required(),
  address_id: number().positive().integer().required(),
  items: array()
    .of<any>(
      object({
        amount: number().positive().required(),
        price: number().positive().required(),
        itemId: number().integer().required(),
        total: number().positive().required(),
      })
    )
    .required(),
  total: number().positive().required(),
  note: string().trim(),
  transshipment: number(),
  payment: mixed()
    .oneOf<FormOfPaymentType>([
      'Dinheiro',
      'Cartão de débidto',
      'Cartão de crédito',
    ])
    .required(),
});
