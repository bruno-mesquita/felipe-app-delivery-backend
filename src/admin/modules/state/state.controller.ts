import { Request, Response } from 'express';
import { CreateStateService, ListStatesService, UpdateStateService } from './services';

export class StateController {
  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      const stateService = new CreateStateService();

      const state = await stateService.execute(body);

      if (state.err) throw new Error(state.err);

      return res.status(201).json(state);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      const listStates = new ListStatesService();

      const states = await listStates.execute();

      if (states.err) throw new Error(states.err);

      return res.json(states);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async update({ params, body }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;
      const updateStateService = new UpdateStateService();

      const states = await updateStateService.execute({ ...body, id });

      if (states.err) throw new Error(states.err);

      return res.json(states);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
