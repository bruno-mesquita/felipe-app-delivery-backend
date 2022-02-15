import type { Request, Response } from 'express';
import { ListCitiesByStatesService } from './services/list-cities-by-state-service';
import Controller from '@shared/utils/controller';

export class AddressEstablishmentController extends Controller {
  constructor() {
    super();

    this.listCitiesByState = this.listCitiesByState.bind(this);
  }

  async listCitiesByState({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;

      const listCitiesByStatesService = new ListCitiesByStatesService();

      return res.json(await listCitiesByStatesService.execute(Number(id)));
    } catch(err) {
      return this.requestError(err, res);
    }
  }
}
