import { lastDayOfMonth, isToday, subHours, addDays } from 'date-fns';
import { Op } from 'sequelize';

import AddressEstablishment from '@core/address-establishment';
import Establishment from '@core/establishment';
import { EstablishmentOwner } from '@core/establishment-owner';
import { Ticket } from '@core/ticket';
import Order from '@core/order';
import { ServiceResponse } from '@shared/utils/service-response';

import { MercadoPago } from '../../../../services/mercado-pago';
import City from '@core/city';
import ApiError from '@shared/utils/ApiError';

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

    return ((orders.reduce((prev, current) => Number(current.total) + prev, 0)) * commission) + monthlyPayment;
  }

  private getDateOfExpiration(): Date {
    const today = new Date();

    return addDays(subHours(today, 3), 5);
  }

  async execute(): Promise<ServiceResponse<any>> {
    try {
      const mercadoPago = new MercadoPago();

      if(this.isToday()) {
        const owners = await this.getOwners();

        if (owners.length === 0) throw new ApiError('Nenhum boleto para gerar');

        await Promise.all(owners.map(async owner => {
          const orders = await owner.establishment.getOrders({
            where: { commission: false, order_status: 'Finalizado' },
            attributes: ['total', 'id'],
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

          const ids = orders.map(order => order.id);

          await Order.update({ commission: true }, { where: { id: { [Op.in]: ids } } })
        }))
      } else {
        return { result: 'Hoje não é o dia de gerar boleto', err: null }
      }

      return { result: {
        message: 'Boletos gerados com sucesso',
      }, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
};
