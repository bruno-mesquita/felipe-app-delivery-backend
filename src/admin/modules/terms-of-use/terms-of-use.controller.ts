import { Request, Response } from 'express';

import { CreateTermsOfUseService } from './services/create-terms-of-use-service/create-terms-of-use.service';
import { UpdateTermsOfUseService } from './services/update-terms-of-use-service/update-terms-of-use.service';

export class TermsOfUseController {
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateTermsOfUseService = new UpdateTermsOfUseService();

      const termsOfUse = await updateTermsOfUseService.execute({ ...req.body, id });

      if (termsOfUse.err) throw new Error(termsOfUse.err);

      return res.status(201).json(termsOfUse);
    } catch(err) {
      return res.status(401).json({ err: err.message });
    }
  }

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
