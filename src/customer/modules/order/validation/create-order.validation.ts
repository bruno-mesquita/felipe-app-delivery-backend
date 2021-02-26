/**
 * @fileoverview Criação do schema de validade para criação de pedidos
 * @author Jonatas Rosa Moura
 */

import { object, SchemaOf, number, string, array } from 'yup';
import { CreateOrderDto } from '../dtos/create-order.dto';

const REQUIRED = 'Campo obrigátorio';

export const schema: SchemaOf<CreateOrderDto> = object({
  establishmentId: string().required(REQUIRED),
  items: array()
    .of<any>(
      object({
        amount: number().required(REQUIRED),
        price: number().required(REQUIRED),
        itemId: string().required(REQUIRED),
        total: number().required(REQUIRED),
      })
    )
    .required(REQUIRED),
  fee: number().required(REQUIRED),
  total: number().required(REQUIRED),
  payment: string().required(REQUIRED),
});
