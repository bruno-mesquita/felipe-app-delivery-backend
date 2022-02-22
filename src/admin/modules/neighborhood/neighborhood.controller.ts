import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import {
  CreateNeighborhoodService,
  UpdateNeighborhoodService,
  DeleteNeighborhoodService,
} from './services';

export class NeighborhoodController extends Controller {
  private readonly createNeighborhoodService: CreateNeighborhoodService;

  private readonly updateNeighborhoodService: UpdateNeighborhoodService;

  private readonly deleteNeighborhoodService: DeleteNeighborhoodService;

  constructor() {
    super(['create', 'update', 'destroy']);

    this.createNeighborhoodService = new CreateNeighborhoodService();
    this.updateNeighborhoodService = new UpdateNeighborhoodService();
    this.deleteNeighborhoodService = new DeleteNeighborhoodService();
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const neighborhoodId = await this.createNeighborhoodService.execute(
        req.body
      );

      return res.status(201).json(neighborhoodId ? { neighborhoodId } : {});
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async update({ body, params }: Request, res: Response): Promise<Response> {
    try {
      await this.updateNeighborhoodService.execute({ ...body, id: params.id });

      return res.status(204).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      await this.deleteNeighborhoodService.execute({
        id: req.params.id as any,
      });

      return res.status(204).json({});
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
