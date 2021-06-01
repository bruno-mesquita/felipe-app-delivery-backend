import { Request, Response } from 'express';

import { GenerateTicketService, VerifyTicketService } from './services';

export class BoletosController {
  async generateTicket(_: Request, res: Response): Promise<Response> {
    try {
      const generateTicketService = new GenerateTicketService();

      const result = await generateTicketService.execute();

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async verifyTicket(req: Request, res: Response): Promise<Response> {
    try {
      const verifyTicketService = new VerifyTicketService();

      const result = await verifyTicketService.execute(Number(req.params.id));

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
};
