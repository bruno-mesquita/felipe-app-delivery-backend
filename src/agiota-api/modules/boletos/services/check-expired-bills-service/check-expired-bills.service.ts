import { parseISO, addBusinessDays, isAfter } from 'date-fns';

import { Ticket } from '@core/ticket';
import { MercadoPago } from '../../../../services/mercado-pago';

export class CheckExpiredBillsService {
  async execute() {
    try {
      const mercadoPago = new MercadoPago();

      const tickets = await Ticket.findAll({ where: { status: 'pending' }, limit: 50 });

      await Promise.all(tickets.map(async ticket => {
        const maxDateExpired = addBusinessDays(ticket.date_of_expiration as any, 3);

        console.log(ticket.date_of_expiration);
        console.log(maxDateExpired);

        if (isAfter(new Date(), maxDateExpired)) {
          await mercadoPago.cancelTicket(ticket.reference_id);

          ticket.cancel();
          await ticket.save();

          console.log('Venceu');
        } else {
          console.log('não venceu');
        }
      }))

      return { result: true, err: null }
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
};
