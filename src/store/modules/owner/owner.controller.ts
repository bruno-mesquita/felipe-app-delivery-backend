import type { Request, Response } from 'express';

import Controller from '@shared/utils/controller';

import { UpdatePasswordEstabishmentService, UpdateOwnerProfileService, ProfileOwnertService } from './services';

export class OwnerController extends Controller {
  constructor() {
    super(['updatePassword', 'updateOwner', 'me']);
  }

  async updatePassword({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const updatePasswordEstabishmentService = new UpdatePasswordEstabishmentService();

      const result = await updatePasswordEstabishmentService.execute({ ...body, id: client.id });

      return res.json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async updateOwner({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const updateOwnerProfileService = new UpdateOwnerProfileService();

      const result = await updateOwnerProfileService.execute(body, client.id);

      return res.json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }

  async me({ body, client }: Request, res: Response): Promise<Response> {
    try {
      const profileOwnertService = new ProfileOwnertService();

      const result = await profileOwnertService.execute(body.selects, client.id);

      return res.json(result);
    } catch (err) {
      return this.requestError(err, res);
    }
  }
};
