/**
 * @fileoverview entidade de produtos
 */
import { DataTypes, Sequelize } from 'sequelize';

import { CustomerStatusType, FormOfPaymentType, StatusOrderType } from './order.types';
import Model from '../_Bases/model';

class Order extends Model {
  payment: FormOfPaymentType;
  total: number;
  discount: number;
  client_order_status: CustomerStatusType;
  order_status: StatusOrderType;
  freight_value: number;
/*   client: Client;
  address: Address;
  evaluation: Evaluation;
  establishment: Establishment; */

  static start(sequelize: Sequelize) {
    this.init({
      payment: DataTypes.STRING,
      total: DataTypes.NUMBER,
      discount: DataTypes.NUMBER,
      client_order_status: DataTypes.STRING,
      order_status: DataTypes.STRING,
      freight_value: DataTypes.NUMBER,
     /*  client: DataTypes.UUIDV4,
      address: DataTypes.UUIDV4,
      evaluation: DataTypes.UUIDV4,
      establishment: DataTypes.UUIDV4, */
    }, { sequelize, tableName: 'orders' });

    return this;
  }

  public getClientOrderStatus(): CustomerStatusType {
    return this.client_order_status;
  }

/*   public setEvaluation(evaluation: Evaluation): void {
    this.evaluation = evaluation;
  } */

  public updateOrder(payment: FormOfPaymentType, client_order_status: CustomerStatusType): void {
    this.payment = payment;
    this.client_order_status = client_order_status;
  }

  public setTotal(total: number): void {
    if (total > 0) {
      this.total = total;
    }
  }

  public open(): void {
    this.order_status = 'Aberto';
    this.client_order_status = 'Enviado';
  }

  private getStatus(): CustomerStatusType[] {
    return ['Enviado', 'Aceito', 'Em preparo', 'Saiu para entrega', 'Entregue', 'Cancelado'];
  }

  public nextStatus(): void {
    if (this.client_order_status !== 'Entregue' && this.client_order_status !== 'Cancelado') {
      const index = this.getStatus().findIndex((item) => item === this.client_order_status);

      const status = this.getStatus()[index + 1];

      if (status === 'Entregue') {
        this.order_status = 'Finalizado';
      } else {
        this.order_status = 'Em andamento';
      }

      this.client_order_status = status;
    }
  }

  public calcTotal(): number {
    return this.total + this.freight_value - this.discount;
  }

  public cancel(): void {
    this.client_order_status = 'Cancelado';
    this.order_status = 'Cancelado';
  }
}

export default Order;
