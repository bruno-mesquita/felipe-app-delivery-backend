import { Ticket } from '@core/ticket';
import { MercadoPago } from '../../../../services/mercado-pago';

export class VerifyTicketService {
  async execute() {
    try {
      const mercadoPago = new MercadoPago();

      const tickets = await Ticket.findAll({ where: { status: 'pending', status_detail: 'pending_waiting_payment' }, limit: 50 });

      await Promise.all(tickets.map(async ticket => {
        const result = await mercadoPago.verifyTicket(ticket.reference_id);

        if(result) {
          ticket.status = result.status;
          ticket.status_detail = result.status_detail;

          await ticket.save();
        }
      }))

      return { result: true, err: null }
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
};
