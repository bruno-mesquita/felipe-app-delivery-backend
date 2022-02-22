import { addBusinessDays, isAfter, subHours } from 'date-fns';

import { Ticket } from '@core/ticket';
import { MercadoPago } from '../../../../services/mercado-pago';

export class CheckExpiredBillsService {
  async execute() {
    try {
      const mercadoPago = new MercadoPago();

      const tickets = await Ticket.findAll({
        where: { status: 'pending' },
        limit: 50,
      });

      await Promise.all(
        tickets.map(async (ticket) => {
          const maxDateExpired = addBusinessDays(
            ticket.date_of_expiration as any,
            3
          );

          const today = subHours(new Date(), 3);

          if (isAfter(today, maxDateExpired)) {
            await mercadoPago.cancelTicket(ticket.reference_id);

            ticket.cancel();
            await ticket.save();
          }
        })
      );

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}
