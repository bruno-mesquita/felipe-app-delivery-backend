/**
 * @fileoverview Controller de Endereço do cliente
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { CreateAddressService } from '../services/CreateAddressService';

class AddressController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const addressService = new CreateAddressService();

      const address = await addressService.execute(req.body);

      if (address.err) throw new Error(address.err);

      return res.status(201).json(address);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export { AddressController };
