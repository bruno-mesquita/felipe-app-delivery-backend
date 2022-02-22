import type { Request, Response } from "express";
import { UpdateImageService } from "./services/update-image.service";

export class ImageEstablishmentController {
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateImageService = new UpdateImageService();

      const imageEstablishment = await updateImageService.execute({ encoded: req.body.encoded, onwerId: req.client.id });

      if (imageEstablishment.err) throw new Error(imageEstablishment.err);

      return res.json(imageEstablishment);
    } catch(err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
