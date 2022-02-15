import { Request, Response } from "express";
import { GenerateReportService } from "./services/generate-report.service";

export class FinancialController {
  async listRenatorio(req: Request, res: Response): Promise<Response> {
    try {
      const generateReportService = new GenerateReportService();

      const report = await generateReportService.execute({
        establishmentId: req.client.entity.getEstablishmentId(),
        data_initial: String(req.query.data_initial),
        data_final: String(req.query.data_final)
      });

      if (report.err) throw new Error(report.err);

      return res.status(200).json(report);
    } catch(err) {
      return res.status(400).json({ err: err.message });
    }
  };
};
