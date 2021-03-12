/**
 * @fileoverview Controller do Estado do cliente
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';
import { CreateStateService } from '../services/State/CreateStateService';
import { ListStatesService } from '../services/State/ListStateService';

class StateController {
  async list(req: Request, res: Response): Promise<Response> {
    const listStates = new ListStatesService();

    const states = await listStates.execute();

    return res.json(states);
  }

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
}

export { StateController };
