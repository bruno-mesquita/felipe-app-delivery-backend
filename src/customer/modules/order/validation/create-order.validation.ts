/**
 * @fileoverview Criação do schema de validade para criação de pedidos
 * @author Jonatas Rosa Moura
 */

import { FormOfPaymentType } from '@core/order/order.types';
import { object, SchemaOf, number, string, array, mixed } from 'yup';
import { CreateOrderDto } from '../dtos/create-order.dto';

const REQUIRED = 'Campo obrigátorio';

export const schema: SchemaOf<CreateOrderDto> = object({
  establishment_id: number().integer().required(),
  client_id: number().integer().required(),
  address_id: number().integer().required(),
  items: array()
    .of<any>(
      object({
        amount: number().required(),
        price: number().required(),
        itemId: number().integer().required(),
        total: number().required(),
      })
    )
    .required(),
  total: number().required(),
  note: string().trim(),
  transshipment: number(),
  payment: mixed()
    .oneOf<FormOfPaymentType>(['Dinheiro', 'Cartão de débidto', 'Cartão de crédito'])
    .required(),
});
