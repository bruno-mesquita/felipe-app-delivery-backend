import { subHours, addDays } from 'date-fns';

import AddressEstablishment from '@core/address-establishment';
import Establishment from '@core/establishment';
import { EstablishmentOwner } from '@core/establishment-owner';
import { Ticket } from '@core/ticket';
import { ServiceResponse } from '@shared/utils/service-response';

import City from '@core/city';
import ApiError from '@shared/utils/ApiError';
import { MercadoPago } from '../../../../services/mercado-pago';

interface FlippValues {
  commission: number;
  monthlyPayment: number;
}

export class GenerateATicketService {
  private async getOwner(id: number): Promise<EstablishmentOwner | null> {
    try {
      return EstablishmentOwner.findOne({
        where: { active: true, id },
        attributes: ['id', 'first_name', 'last_name', 'email', 'cpf'],
        include: [
          {
            model: Establishment,
            as: 'establishment',
            where: { active: true },
            attributes: ['id'],
            include: [
              {
                model: AddressEstablishment,
                as: 'address',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                  {
                    model: City,
                    as: 'city',
                    attributes: ['name'],
                  },
                ],
              },
            ],
          },
        ],
      });
    } catch (err) {
      return null;
    }
  }

  private getDateOfExpiration(): Date {
    const today = new Date();

    return addDays(subHours(today, 3), 5);
  }

  async execute(
    ownerId: number,
    total: number,
    ticketId: number
  ): Promise<ServiceResponse<any>> {
    try {
      const mercadoPago = new MercadoPago();

      const owner = await this.getOwner(ownerId);

      if (!owner) throw new ApiError('Usuário não encontrado');

      const paymentData = mercadoPago.generatePaymentData({
        owner,
        description: 'Comissão + mensalidade do Flipp Delivery',
        transaction_amount: total,
        date_of_expiration: this.getDateOfExpiration(),
      });

      const mercadoPagoTicket = await mercadoPago.generateTicket(paymentData);

      const ticket = await Ticket.findOne({
        where: { id: ticketId, status: 'cancelled' },
      });

      if (!ticket) throw new ApiError('Boleto não encontrado');

      (ticket.barcode = mercadoPagoTicket.barcode.content),
        (ticket.date_created = mercadoPagoTicket.date_created),
        (ticket.status = mercadoPagoTicket.status as any),
        (ticket.link =
          mercadoPagoTicket.transaction_details.external_resource_url),
        (ticket.status_detail = mercadoPagoTicket.status_detail),
        (ticket.verification_code =
          mercadoPagoTicket.verification_code ||
          mercadoPagoTicket.transaction_details.verification_code),
        (ticket.payment_method_reference_id =
          mercadoPagoTicket.payment_method_reference_id ||
          mercadoPagoTicket.transaction_details.payment_method_reference_id),
        (ticket.date_of_expiration = mercadoPagoTicket.date_of_expiration),
        (ticket.date_last_updated = mercadoPagoTicket.date_last_updated),
        (ticket.reference_id = mercadoPagoTicket.id),
        await ticket.save();

      return { result: ticket, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
