/**
 * @fileoverview entidade de produtos
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import Evaluation from '@core/evaluation';
import Client from '@core/client';
import Address from '@core/address';
import Establishment from '@core/establishment';
import { CustomerStatusType, FormOfPaymentType, StatusOrderType } from './order.types';

@Entity('order')
class Order extends EntityBase {
  @Column({ type: 'varchar' })
  payment: FormOfPaymentType;

  @Column('decimal')
  total: number;

  @Column('decimal')
  discount: number;

  @Column({ type: 'varchar' })
  client_order_status: CustomerStatusType;

  @Column({ type: 'varchar' })
  order_status: StatusOrderType;

  @Column('decimal')
  freight_value: number;

  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Address, (address) => address.orders)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToOne(() => Evaluation)
  @JoinColumn({ name: 'evaluation_id' })
  evaluation: Evaluation;

  @ManyToOne(() => Establishment, (store) => store.orders)
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;

  public setEvaluation(evaluation: Evaluation): void {
    this.evaluation = evaluation;
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
