import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import AddressEstablishment from '@core/address-establishment';
import ApiError from '@shared/utils/ApiError';
import { ListNeighborhoodsService } from './services';

export class NeighborhoodController extends Controller {
  private readonly listNeighborhoodsService: ListNeighborhoodsService;

  constructor() {
    super(['list']);

    this.listNeighborhoodsService = new ListNeighborhoodsService();
  }

  async list({ query }: Request, res: Response): Promise<Response> {
    try {
      const { cityId } = query;

      if (!cityId) throw new ApiError('CityId ausente');

      const neighborhoods = await this.listNeighborhoodsService.execute(Number(cityId));

      return res.json(neighborhoods);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
