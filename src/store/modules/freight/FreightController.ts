import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import { CreateFreightService, DeleteFreightService, ListFreightsService, UpdateFreightService } from './services';

export class FreightController extends Controller {
  private createFreightService: CreateFreightService;

  private deleteFreightService: DeleteFreightService;

  private listFreightsService: ListFreightsService;

  private updateFreightService: UpdateFreightService;

  constructor() {
    super(['create', 'delete', 'update', 'list']);
    this.createFreightService = new CreateFreightService();
    this.deleteFreightService = new DeleteFreightService();
    this.listFreightsService = new ListFreightsService();
    this.updateFreightService = new UpdateFreightService();
  }

  async create({ body, client }: Request, res: Response) {
    try {
      const freightId = await this.createFreightService.execute({
        neighborhoodId: Number(body.neighborhoodId),
        price: Number(body.price),
        establishmentId: client.entity.establishment_id,
      });

      return res.status(201).json({ freightId });
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async update({ body, params }: Request, res: Response) {
    try {
      await this.updateFreightService.execute({
        freightId: Number(params.id),
        ...body,
      });

      return res.status(204).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async list({ client }: Request, res: Response) {
    try {
      const freights = await this.listFreightsService.execute({
        establishmentId: client.entity.establishment_id,
      });

      return res.json(freights);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async delete({ params }: Request, res: Response) {
    try {
      await this.deleteFreightService.execute({
        freightId: Number(params.id),
      });

      return res.status(204).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
