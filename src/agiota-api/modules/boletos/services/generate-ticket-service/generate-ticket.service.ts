import { lastDayOfMonth, isToday, subHours } from 'date-fns';

import AddressEstablishment from '@core/address-establishment';
import Establishment from '@core/establishment';
import { EstablishmentOwner } from '@core/establishment-owner';
import { Ticket } from '@core/ticket';
import Order from '@core/order';
import { ServiceResponse } from '@shared/utils/service-response';

import { MercadoPago } from '../../../../services/mercado-pago';
import City from '@core/city';

interface FlippValues {
  commission: number; monthlyPayment: number
}

export class GenerateTicketService {
  private getFlippPrices(): FlippValues {
    return {
      commission: 0.07,
      monthlyPayment: 50,
    }
  }

  private isToday(): boolean {
    const dateNow = new Date();
    const lastDay = lastDayOfMonth(dateNow);

    return isToday(lastDay);
  }

  private async getOwners(): Promise<EstablishmentOwner[]> {
    try {
      return EstablishmentOwner.findAll({
        where: { active: true },
        attributes: ['id', 'first_name', 'last_name', 'email', 'cpf'],
        include: [{
          model: Establishment,
          as: 'establishment',
          where: { active: true },
          attributes: ['id'],
          include: [{
            model: AddressEstablishment,
            as: 'address',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
              model: City,
              as: 'city',
              attributes: ['name']
            }]
          }]
        }],
        limit: 50
      });
    } catch (err) {
      return [];
    }
  }

  private calcTotal(orders: Order[]): number {
    const { commission, monthlyPayment } = this.getFlippPrices();

    return ((orders.reduce((prev, current) => current.total + prev, 0)) * commission) + monthlyPayment;
  }

  private getDateOfExpiration(): Date {
    const today = new Date();

    return subHours(today, 3);
  }

  async execute(): Promise<ServiceResponse<any>> {
    try {
      const mercadoPago = new MercadoPago();

      if(this.isToday()) {
        const owners = await this.getOwners();

        if (owners.length === 0) throw new Error('Nenhum boleto para gerar');

        await Promise.all(owners.map(async owner => {
          const orders = await owner.establishment.getOrders({
            where: { commission: false },
            attributes: ['total'],
          });

          const total = this.calcTotal(orders);

          const paymentData = mercadoPago.generatePaymentData({
            owner,
            description: 'Comissão + mensalidade do Flipp Delivery',
            transaction_amount: total,
            date_of_expiration: this.getDateOfExpiration(),
          });

          const mercadoPagoTicket = await mercadoPago.generateTicket(paymentData);

          await Ticket.create({
            barcode: mercadoPagoTicket.barcode.content,
            date_created: mercadoPagoTicket.date_created,
            price: total,
            status: mercadoPagoTicket.status,
            link: mercadoPagoTicket.transaction_details.external_resource_url,
            status_detail: mercadoPagoTicket.status_detail,
            verification_code: mercadoPagoTicket.verification_code || mercadoPagoTicket.transaction_details.verification_code,
            payment_method_reference_id: mercadoPagoTicket.payment_method_reference_id || mercadoPagoTicket.transaction_details.payment_method_reference_id,
            date_of_expiration: mercadoPagoTicket.date_of_expiration,
            date_last_updated: mercadoPagoTicket.date_last_updated,
            reference_id: mercadoPagoTicket.id,
            establishment_id: owner.establishment.id,
          });
        }))
      } else {
        return { result: 'Hoje não é o dia de gerar boleto', err: null }
      }

      return { result: {
        message: 'Boletos gerados com sucesso',
      }, err: null };
    } catch (err) {
      return { err: err.message, result: null };
    }
  }
};
