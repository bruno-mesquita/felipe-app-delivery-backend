import Controller from '@shared/utils/controller';
import type { Request, Response } from 'express';

import { FindOneRateService, CreateRateService } from './services';
import { createRateValidate } from './validations';

class RateController extends Controller {
  constructor() {
    super();

    this.findOne = this.findOne.bind(this);
    this.create = this.create.bind(this);
  }

  async findOne({ params }: Request, res: Response): Promise<Response> {
    try {
      const findOneRateService = new FindOneRateService();

      const result = await findOneRateService.execute(Number(params.id));

      return res.json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async create({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const values = createRateValidate({
        ...body,
        clientId: client.id,
      });

      const createRateService = new CreateRateService();

      const response = await createRateService.execute(values);

      return res.json(response);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}

export default RateController;
