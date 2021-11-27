import { Request, Response } from 'express';
import { ListAnnouncementService } from './services';

export class AnnouncementController {
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
}
