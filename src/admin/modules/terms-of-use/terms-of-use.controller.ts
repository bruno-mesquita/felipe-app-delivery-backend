import { Request, Response } from 'express';

import { CreateTermsOfUseService } from './services/create-terms-of-use-service/create-terms-of-use.service';
import { ShowTermsOfUse } from './services/show-terms-of-use-service/show-terms-of-use.service';
import { UpdateTermsOfUseService } from './services/update-terms-of-use-service/update-terms-of-use.service';

export class TermsOfUseController {
  async update({ params, body }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;
      const updateTermsOfUseService = new UpdateTermsOfUseService();

      const termsOfUse = await updateTermsOfUseService.execute({ ...body, id });

      return res.status(201).json(termsOfUse);
    } catch(err) {
      return res.status(401).json({ err: err.message });
    }
  }

  async show(_: Request, res: Response): Promise<Response> {
    try {
      const showTermsOfUseService = new ShowTermsOfUse();

      const termsOfUse = await showTermsOfUseService.execute();

      return res.status(201).json(termsOfUse);
    } catch(err) {
      return res.status(401).json({ err: err.message });
    }
  }

  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      const createTermsOfUseService = new CreateTermsOfUseService();

      const termsOfUse = await createTermsOfUseService.execute(body);

      return res.status(201).json(termsOfUse);
    } catch(err) {
      return res.status(401).json({ err: err.message });
    }
  }
}
