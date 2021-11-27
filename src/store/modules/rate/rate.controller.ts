import { Request, Response } from "express";
import { ListRateService } from "./services/list-rates-service/list-rates.service";

export class RateController {
  async listRates({ query, client }: Request, res: Response): Promise<Response> {
    try {
      const listRateService = new ListRateService();

      const { page = 0 } = query;
      const establishmentId = client.entity.getEstablishmentId();

      const listRates = await listRateService.execute({ page: Number(page), establishmentId: establishmentId });

      if (listRates.err) throw new Error(listRates.err);

      return res.status(200).json(listRates);
    } catch(err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
