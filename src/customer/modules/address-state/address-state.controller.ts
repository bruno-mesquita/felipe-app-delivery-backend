/**
 * @fileoverview Controller de Endereço do cliente
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { ListCitiesByStatesService } from './services/list-cities-by-state-service';
import { ListStatesService } from './services/list-state-service';

class AddressStateController {
  async listCitiesByState(req: Request, res: Response): Promise<Response> {
    const { state_id } = req.params;

    const listCitiesByState = new ListCitiesByStatesService();

    const state = await listCitiesByState.execute(state_id);

    return res.json(state);
  }

  async listState(req: Request, res: Response): Promise<Response> {
    try {
      const listStates = new ListStatesService();

      const result = await listStates.execute();

      if(result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }

  }
}

export { AddressStateController };
