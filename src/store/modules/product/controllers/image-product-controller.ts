import { Request, Response } from 'express';
import { CreateImageProductService } from '../services/create-image-service/create-image.service';

class ImagesController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;

      const imageService = new CreateImageProductService();

      const image = await imageService.execute({ ...req.body, id });

      return res.status(201).json(image);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}

export { ImagesController };
