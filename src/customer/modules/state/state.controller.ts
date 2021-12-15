/**
 * @fileoverview Controller de Endereço do cliente
 * @author Jonatas Rosa Moura
 */

import { Request, Response } from 'express';

import Controller from '@shared/utils/controller';
import { ListCitiesByStateService, ListStatesService } from './services';

class StateController extends Controller {
  constructor() {
    super();

    this.list = this.list.bind(this);
    this.listCities = this.listCities.bind(this);
  }

  async listCities({ params }: Request, res: Response): Promise<Response> {
    try {
      const { stateId } = params;

      const listCitiesByState = new ListCitiesByStateService();

      const state = await listCitiesByState.execute(stateId);

      return res.json(state);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      const listStates = new ListStatesService();

      const result = await listStates.execute();

      return res.json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default StateController;
