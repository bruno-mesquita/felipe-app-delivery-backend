import { Request, Response } from "express";
import { ListRateService } from "./services/list-rates-service/list-rates.service";

export class RateController {
  async listRates(req: Request, res: Response): Promise<Response> {
    try {
      const listRateService = new ListRateService();

      const listRates = await listRateService.execute({...req.body, id: req.client.id});

      if (listRates.err) throw new Error(listRates.err);

      return res.status(200).json(listRates);
    } catch(err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
