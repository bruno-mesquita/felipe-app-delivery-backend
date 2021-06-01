import { MercadoPago } from '../../../../services/mercado-pago';

export class VerifyTicketService {
  async execute(id: number) {
    const mercadoPago = new MercadoPago();


    const ticket = await mercadoPago.verifyTicket(id);

    return ticket;
  }
};
