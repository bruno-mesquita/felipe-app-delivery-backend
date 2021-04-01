/**
 * @fileoverview Criação do schema de validade para criação de pedidos
 * @author Jonatas Rosa Moura
 */

import { FormOfPaymentType } from '@core/order/order.types';
import { object, SchemaOf, number, string, array, mixed } from 'yup';
import { CreateOrderDto } from '../dtos/create-order.dto';

const REQUIRED = 'Campo obrigátorio';

export const schema: SchemaOf<CreateOrderDto> = object({
  establishmentId: string().uuid().required(REQUIRED),
  items: array()
    .of<any>(
      object({
        amount: number().required(REQUIRED),
        price: number().required(REQUIRED),
        itemId: string().uuid().required(REQUIRED),
        total: number().required(REQUIRED),
      })
    )
    .required(REQUIRED),
  total: number().required(REQUIRED),
  payment: mixed()
    .oneOf<FormOfPaymentType>(['Dinheiro', 'Cartão de débidto', 'Cartão de crédito'])
    .required(REQUIRED),
});
