import { Request, Response } from 'express';
import {
  CreateAnnouncementService,
  ShowAnnouncementService,
  ListAnnouncementService,
  UpdateProductService,
  DeleteAnnouncementService
} from './services';

export class AnnouncementController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createAnnouncement = new CreateAnnouncementService();

      const announcement = await createAnnouncement.execute(req.body);

      if (announcement.err) throw new Error(announcement.err);

      return res.status(201).json(announcement);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const showAnnouncement = new ShowAnnouncementService();

      const announcement = await showAnnouncement.execute(req.client.id, Number(id));

      if (announcement.err) throw new Error(announcement.err);

      return res.status(200).json(announcement);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listAnnouncement = new ListAnnouncementService();

      const announcement = await listAnnouncement.execute(req.client.id);

      if (announcement.err) throw new Error(announcement.err);

      return res.status(200).json(announcement);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const createAnnouncement = new UpdateProductService();

      const announcement = await createAnnouncement.execute({
        ...req.body,
        adminId: req.client.id,
        id
      });

      if (announcement.err) throw new Error(announcement.err);

      return res.status(200).json(announcement);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleteAnnouncement = new DeleteAnnouncementService();

      const announcement = await deleteAnnouncement.execute(req.client.id, Number(id));

      if (announcement.err) throw new Error(announcement.err);

      return res.status(200).json(announcement);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
}
