import type { Request, Response } from 'express';

import Controller from "@shared/utils/controller";

import { CreateNeighborhoodService } from './services';

export class NeighborhoodController extends Controller {
  private readonly createNeighborhoodService: CreateNeighborhoodService;

  constructor() {
    super(['store']);

    this.createNeighborhoodService = new CreateNeighborhoodService();
  }

  async store(req: Request, res: Response): Promise<Response> {
    try {
      const neighborhoodId = await this.createNeighborhoodService.execute(req.body);

      return res.status(201).json(neighborhoodId ? { neighborhoodId } : {});
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
