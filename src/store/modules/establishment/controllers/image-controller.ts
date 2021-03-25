import { Request, Response } from 'express';
import { CreateImageService } from '../services/create-image.service';

export class ImageController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const imageService = new CreateImageService();

      const image = await imageService.execute(req.body);

      if (image.err) throw new Error(image.err);

      return res.status(201).json(image);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
