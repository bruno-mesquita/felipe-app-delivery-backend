import { Request, Response } from "express";
import { ShowTermsOfUseService } from "./services/show-terms-of-use.service";

export class TermsOfUseController {
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const showTermsOfUseService = new ShowTermsOfUseService();

      const termsOfUse = await showTermsOfUseService.execute();

      if (termsOfUse.err) throw new Error(termsOfUse.err);

      return res.status(200).json(termsOfUse);
    } catch(err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
