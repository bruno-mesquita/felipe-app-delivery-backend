/**
 * @fileoverview Controller de Endereço do cliente
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { ListCitiesByStatesService } from './services/ListCitiesByStateService';
import { ListStatesService } from './services/ListStateService';

class AddressStateController {
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
}

export { AddressStateController };
