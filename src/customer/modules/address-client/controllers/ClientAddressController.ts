import { Request, Response } from 'express';
import { CreateAddressClientService } from '../services/create-address-client';

class ClientAddressController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const clientAddressService = new CreateAddressClientService();

      const clientAddress = await clientAddressService.execute(req.body);

      if (clientAddress.err) throw new Error(clientAddress.err);

      return res.status(201).json(clientAddress);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export { ClientAddressController };
