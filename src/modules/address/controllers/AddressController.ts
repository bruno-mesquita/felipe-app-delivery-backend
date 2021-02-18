/**

 * @fileoverview Controller do Endereço

 *

 * @author Jonatas Rosa Moura

 */

import { Request, Response } from 'express';
import CreateAddressService from '../services/create-address-service/create-address.service';

export default class AddressController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createAddressService = new CreateAddressService();

      const address = await createAddressService.execute(req.body);

      return res.status(201).json(address);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
