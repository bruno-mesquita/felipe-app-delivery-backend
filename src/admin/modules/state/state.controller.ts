import { Request, Response } from 'express';
import { CreateStateService, ListStatesService, UpdateStateService } from './services';

export class StateController {
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

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listStates = new ListStatesService();

      const states = await listStates.execute();

      if (states.err) throw new Error(states.err);

      return res.json(states);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateStateService = new UpdateStateService();

      const states = await updateStateService.execute({ ...req.body, id });

      if (states.err) throw new Error(states.err);

      return res.json(states);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
