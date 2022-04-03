import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import AddressEstablishment from '@core/address-establishment';
import { ListNeighborhoodsService } from './services';

export class NeighborhoodController extends Controller {
  private readonly listNeighborhoodsService: ListNeighborhoodsService;

  constructor() {
    super(['list']);

    this.listNeighborhoodsService = new ListNeighborhoodsService();
  }

  async list({ client }: Request, res: Response): Promise<Response> {
    try {
      const partner = await client.entity.getEstablishment({
        attributes: ['address_id'],
        include: [{ model: AddressEstablishment, as: 'address', attributes: ['city_id'] }],
      });

      const neighborhoods = await this.listNeighborhoodsService.execute(partner.address.city_id);

      return res.json(neighborhoods);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
