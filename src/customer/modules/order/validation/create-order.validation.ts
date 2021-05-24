/**
 * @fileoverview Criação do schema de validade para criação de pedidos
 * @author Jonatas Rosa Moura
 */

import { FormOfPaymentType } from '@core/order/order.types';
import { object, SchemaOf, number, string, array, mixed } from 'yup';
import { CreateOrderDto } from '../dtos/create-order.dto';

const REQUIRED = 'Campo obrigátorio';

export const schema: SchemaOf<CreateOrderDto> = object({
  establishment_id: number().integer().required(REQUIRED),
  client_id: number().integer().required(REQUIRED),
  address_id: number().integer().required(REQUIRED),
  items: array()
    .of<any>(
      object({
        amount: number().required(REQUIRED),
        price: number().required(REQUIRED),
        itemId: number().integer().required(REQUIRED),
        total: number().required(REQUIRED),
      })
    )
    .required(REQUIRED),
  total: number().required(REQUIRED),
  note: string(),
  transshipment: number(),
  payment: mixed()
    .oneOf<FormOfPaymentType>(['Dinheiro', 'Cartão de débidto', 'Cartão de crédito'])
    .required(REQUIRED),
});
