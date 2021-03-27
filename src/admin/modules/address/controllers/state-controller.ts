/**
 * @fileoverview Controller do Estado do cliente
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { CreateStateService } from '../services/create-state.service';
import { ListCitiesByStatesService } from '../services/list-cities-by-state-service';
import { ListStatesService } from '../services/list-state-service';

class StateController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const stateService = new CreateStateService();

      const state = await stateService.execute(req.body);

      if (state.err) throw new Error(state.err);

      return res.status(201).json(state);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

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

export { StateController };
