/**
 * @fileoverview Controller de Endereço do cliente
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { CreateAddressService } from './services/CreateAddressService';
import { ListCitiesByStatesService } from './services/ListCitiesByStateService';
import { ListStatesService } from './services/ListStateService';

class AddressController {
  async listCitiesByState(req: Request, res: Response): Promise<Response> {
    const { state_id } = req.params;

    const listCitiesByState = new ListCitiesByStatesService();

    const state = await listCitiesByState.execute(state_id);

    return res.json(state);
  }

  async listState(req: Request, res: Response): Promise<Response> {
    const listStates = new ListStatesService();

    const states = await listStates.execute();

    return res.json(states);
  }

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
