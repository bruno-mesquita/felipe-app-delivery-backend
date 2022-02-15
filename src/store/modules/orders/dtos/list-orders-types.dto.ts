import { CustomerStatusType } from '@core/order/order.types';

export interface ListOrdersDto {
  id: number;
  page?: number;
  types: CustomerStatusType[];
}
