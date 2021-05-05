import { StatusOrderType } from "@core/order/order.types";

export interface UpdateOrderStatusDto {
  id: number;
  order_status: StatusOrderType;
};
