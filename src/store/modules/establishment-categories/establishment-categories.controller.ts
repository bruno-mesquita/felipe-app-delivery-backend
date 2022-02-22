import { Response, Request } from 'express';

import {
  AddEstablishmentCategoryService,
  RemoveEstablishmentCategoryService,
} from './services';

export class EstablishmentCategoriesController {
  async add({ client, params }: Request, res: Response): Promise<Response> {
    try {
      const addEstablishmentCategoryService =
        new AddEstablishmentCategoryService();

      const result = await addEstablishmentCategoryService.execute(
        client.id,
        Number(params.categoryId)
      );

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async remove({ client, params }: Request, res: Response): Promise<Response> {
    try {
      const removeEstablishmentCategoryService =
        new RemoveEstablishmentCategoryService();

      const result = await removeEstablishmentCategoryService.execute(
        client.id,
        Number(params.categoryId)
      );

      if (result.err) throw new Error(result.err);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
