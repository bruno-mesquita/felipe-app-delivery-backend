import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import { FindOneImageService } from './services';

export class ImageController extends Controller {
  private readonly findOneImageService: FindOneImageService;

  constructor() {
    super(['findOne']);

    this.findOneImageService = new FindOneImageService();
  }

  async findOne({ params }: Request, res: Response): Promise<Response> {
    try {
      const result = await this.findOneImageService.execute(Number(params.id));

      return res.json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
