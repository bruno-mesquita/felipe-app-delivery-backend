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
  transshipment: number;
  note: string;
  address_id: number;
  evaluation_id: number;
  establishment_id: number;
  client_id: number;

  static start(sequelize: Sequelize) {
    this.init({
      payment: DataTypes.STRING,
      total: DataTypes.DECIMAL,
      discount: DataTypes.NUMBER,
      client_order_status: DataTypes.STRING,
      order_status: DataTypes.STRING,
      freight_value: DataTypes.DECIMAL,
      transshipment: DataTypes.DECIMAL,
      note: DataTypes.STRING,
    }, { sequelize, tableName: 'orders' });

    return this;
  }

  static associate({ Evaluation, Establishment, Client, AddressClient }): void {
    this.belongsTo(Evaluation, { foreignKey: 'evaluation_id', as: 'evaluation' })
    this.belongsTo(Establishment, { foreignKey: 'establishment_id', as: 'establishment' })
    this.belongsTo(Client, { foreignKey: 'client_id', as: 'client' })
    this.belongsTo(AddressClient, { foreignKey: 'address_id', as: 'address_client' })
  }

  public getClientOrderStatus(): CustomerStatusType {
    return this.client_order_status;
  }

  public setOrderStatus(order_status: StatusOrderType): void {
    this.order_status = order_status;
  }

  public setEvaluationId(evaluationId: number): void {
    this.evaluation_id = evaluationId;
  }

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
