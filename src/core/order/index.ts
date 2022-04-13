import { DataTypes, Sequelize } from 'sequelize';

import { CustomerStatusType, FormOfPaymentType, StatusOrderType } from './order.types';
import Model from '../_Bases/model';

class Order extends Model {
  payment: FormOfPaymentType;

  declare total: number;

  declare discount: number;

  declare client_order_status: CustomerStatusType;

  declare order_status: StatusOrderType;

  declare freight_value: number;

  declare transshipment: number;

  declare note: string;

  declare address_id: number;

  declare evaluation_id: number;

  declare establishment_id: number;

  declare client_id: number;

  declare commission: boolean;

  static start(sequelize: Sequelize) {
    this.init(
      {
        payment: DataTypes.STRING,
        total: DataTypes.DECIMAL,
        discount: DataTypes.NUMBER,
        client_order_status: DataTypes.STRING,
        order_status: DataTypes.STRING,
        freight_value: DataTypes.DECIMAL,
        transshipment: DataTypes.DECIMAL,
        note: DataTypes.STRING,
        commission: DataTypes.BOOLEAN,
      },
      { sequelize, tableName: 'order' }
    );

    return this;
  }

  static associate({ Evaluation, Establishment, Client, AddressClient }): void {
    this.belongsTo(Evaluation, {
      foreignKey: 'evaluation_id',
      as: 'evaluation',
    });
    this.belongsTo(Establishment, {
      foreignKey: 'establishment_id',
      as: 'establishment',
    });
    this.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });
    this.belongsTo(AddressClient, {
      foreignKey: 'address_id',
      as: 'address_client',
    });
  }

  public getClientOrderStatus(): CustomerStatusType {
    return this.get('client_order_status');
  }

  public setOrderStatus(order_status: StatusOrderType): void {
    this.set('order_status', order_status);
  }

  public setEvaluationId(evaluationId: number): void {
    this.set('evaluation_id', evaluationId);
  }

  public updateOrder(payment: FormOfPaymentType, client_order_status: CustomerStatusType): void {
    this.set('payment', payment);
    this.set('client_order_status', client_order_status);
  }

  public setTotal(total: number): void {
    if (total > 0) {
      this.set('total', total);
    }
  }

  public open(): void {
    this.set('order_status', 'Aberto');
    this.set('client_order_status', 'Novo');
  }

  private getStatus(): CustomerStatusType[] {
    return ['Novo', 'Aceito', 'Em preparo', 'Saiu para entrega', 'Entregue', 'Cancelado'];
  }

  public nextStatus(): void {
    if (this.get('client_order_status') !== 'Entregue' && this.get('client_order_status') !== 'Cancelado') {
      const index = this.getStatus().findIndex((item) => item === this.get('client_order_status'));

      const status = this.getStatus()[index + 1];

      if (status === 'Entregue') {
        this.set('client_order_status', 'Finalizado');
      } else {
        this.set('client_order_status', 'Em andamento');
      }

      this.set('client_order_status', status);
    }
  }

  public calcTotal(): number {
    return this.get('total') + this.get('freight_value') - this.get('discount');
  }

  public cancel(): void {
    this.set('client_order_status', 'Cancelado');
    this.set('order_status', 'Cancelado');
  }
}

export default Order;
