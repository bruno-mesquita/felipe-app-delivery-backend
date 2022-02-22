import Controller from '@shared/utils/controller';
import type { Request, Response } from 'express';
import { ListCitiesByStatesService } from './services/list-cities-by-state-service';
import { ListStatesService } from './services/list-state-service';

export class AddressStateController extends Controller {
  private listCitiesByStatesService: ListCitiesByStatesService;
  private listStatesService: ListStatesService;

  constructor() {
    super();

    this.listCitiesByStatesService = new ListCitiesByStatesService();
    this.listStatesService = new ListStatesService();

    this.listCitiesByState = this.listCitiesByState.bind(this);
    this.listState = this.listState.bind(this);
  }

  async listCitiesByState({ params }: Request, res: Response): Promise<Response> {
    try {
      const { stateId } = params;

      return res.json(await this.listCitiesByStatesService.execute(stateId));
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async listState(_: Request, res: Response): Promise<Response> {
    try {
      return res.json(await this.listStatesService.execute());
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
