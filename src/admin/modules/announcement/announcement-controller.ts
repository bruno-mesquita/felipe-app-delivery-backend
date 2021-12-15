import { Request, Response } from 'express';
import {
  CreateAnnouncementService,
  ShowAnnouncementService,
  ListAnnouncementService,
  UpdateProductService,
  DeleteAnnouncementService
} from './services';

export class AnnouncementController {
  async create({ body }: Request, res: Response): Promise<Response> {
    try {
      const createAnnouncement = new CreateAnnouncementService();

      const announcement = await createAnnouncement.execute(body);

      if (announcement.err) throw new Error(announcement.err);

      return res.status(201).json(announcement);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async show({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;
      const showAnnouncement = new ShowAnnouncementService();

      const announcement = await showAnnouncement.execute(Number(id));

      if (announcement.err) throw new Error(announcement.err);

      return res.status(200).json(announcement);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      const listAnnouncement = new ListAnnouncementService();

      const announcement = await listAnnouncement.execute();

      if (announcement.err) throw new Error(announcement.err);

      return res.status(200).json(announcement);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async update({ params, body }: Request, res: Response): Promise<Response> {
    try {
      const updateProductService = new UpdateProductService();

      const id = Number(params.id);

      const { err } = await updateProductService.execute({ ...body, id });

      if(err) throw new Error();

      return res.status(200).json();
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async delete({ params }: Request, res: Response): Promise<Response> {
    try {
      const { id } = params;
      const deleteAnnouncement = new DeleteAnnouncementService();

      const announcement = await deleteAnnouncement.execute(Number(id));

      if (announcement.err) throw new Error(announcement.err);

      return res.status(200).json(announcement);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
