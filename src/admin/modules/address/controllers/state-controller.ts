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
    try {
      const { state_id } = req.params;

      const listCitiesByState = new ListCitiesByStatesService();

      const citiesByState = await listCitiesByState.execute(Number(state_id));

      if (citiesByState.err) throw new Error(citiesByState.err);

      return res.status(200).json(citiesByState);
    } catch(err) {
      return res.status(400).json({ err: err.meesage });
    }
  }

  async listState(req: Request, res: Response): Promise<Response> {
    try {
      const listStates = new ListStatesService();

      const states = await listStates.execute();

      if (states.err) throw new Error(states.err);

      return res.json(states);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export { StateController };
