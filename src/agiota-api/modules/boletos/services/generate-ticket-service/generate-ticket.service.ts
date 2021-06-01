import AddressEstablishment from '@core/address-establishment';
import City from '@core/city';
import Establishment from '@core/establishment';
import { EstablishmentOwner } from '@core/establishment-owner';
import { Ticket } from '@core/ticket';
import { ServiceResponse } from '@shared/utils/service-response';

import { MercadoPago } from '../../../../services/mercado-pago';

export class GenerateTicketService {
  async execute(id: number): Promise<ServiceResponse<any>> {
    try {
      const mercadoPago = new MercadoPago();

      const owner = await EstablishmentOwner.findOne({
        where: { active: true },
        include: [{
          model: Establishment,
          where: { id, active: true },
          attributes: ['id', 'active'],
          include: [{
            model: AddressEstablishment,
            as: 'address',
            attributes: { exclude: ['createdAt', 'updatedAt', 'city_id'] },
            include: [{
              model: City,
              as: 'city',
              attributes: ['name'],
            }]
          }]
        }]
      });

      if(!owner) throw new Error('Estabelecimento não encontrado');

      const orders = await owner.establishment.getOrders({
        where: { commission: false },
        attributes: ['total'],
      });

      const total = (orders.reduce((prev, current) => current.total + prev, 0)) * 0.07;

      const paymentData = mercadoPago.generatePaymentData({
        owner,
        description: 'Comissão do Flipp Delivery',
        transaction_amount: total,
      });

      const mercadoPagoTicket = await mercadoPago.generateTicket(paymentData);

      const ticket = await Ticket.create({
        barcode: mercadoPagoTicket.barcode.content,
        date_created: mercadoPagoTicket.date_created,
        price: total,
        status: mercadoPagoTicket.status,
        link: mercadoPagoTicket.transaction_details.external_resource_url,
        status_detail: mercadoPagoTicket.status_detail,
        verification_code: mercadoPagoTicket.verification_code,
        payment_method_reference_id: mercadoPagoTicket.payment_method_reference_id,
        date_of_expiration: mercadoPagoTicket.date_of_expiration,
        date_last_updated: mercadoPagoTicket.date_last_updated,
        reference_id: mercadoPagoTicket.id,
        establishment_id: owner.establishment.id,
      });

      return { result: ticket, err: null };
    } catch (err) {
      return { err: 'Erro ao gerar boleto', result: null };
    }
  }
};
