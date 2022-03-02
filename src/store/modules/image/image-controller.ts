import Controller from '@shared/utils/controller';
import type { Request, Response } from 'express';
import { UpdateImageService } from './services/update-image.service';

export class ImageEstablishmentController extends Controller {
  constructor() {
    super(['update']);
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateImageService = new UpdateImageService();

      await updateImageService.execute({
        encoded: req.body.encoded,
        establishmentId: req.client.entity.getEstablishmentId(),
      });

      return res.json({ ok: true });
    } catch (err) {
      return this.requestError(err, res);
    }
  }
}
