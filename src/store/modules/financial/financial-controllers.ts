import { Request, Response } from "express";
import { GenerateRenatorioService } from "./services/generate-renatorio.service";

export class FinancialController {
  async listRenatorio(req: Request, res: Response): Promise<Response> {
    try {
      const generateRenatorio = new GenerateRenatorioService();

      const renatorio = await generateRenatorio.execute({
        id: Number(req.client.id),
        data_initial: String(req.query.data_initial),
        data_final: String(req.query.data_final)
      });

      if (renatorio.err) throw new Error(renatorio.err);

      return res.status(200).json(renatorio);
    } catch(err) {
      return res.status(400).json({ err: err.message });
    }
  };
};
