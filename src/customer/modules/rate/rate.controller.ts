import { Request, Response } from 'express';

import { FindOneRateService } from './services';

export class RateController {
  async findOne({ params }: Request, res: Response): Promise<Response> {
    try {
      const findOneRateService = new FindOneRateService();

      const result = await findOneRateService.execute(Number(params.id));

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: 'Erro ao procurar a avaliação' });
    }
  }
}
