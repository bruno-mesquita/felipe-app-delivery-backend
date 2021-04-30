import { Request, Response } from 'express';

import { CreateTermsOfUseService } from './services/create-terms-of-use-service/create-terms-of-use.service';

export class TermsOfUseController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createTermsOfUseService = new CreateTermsOfUseService();

      const termsOfUse = await createTermsOfUseService.execute(req.body);

      if (termsOfUse.err) throw new Error(termsOfUse.err);

      return res.status(201).json(termsOfUse);
    } catch(err) {
      return res.status(401).json({ err: err.message });
    }
  }
}
