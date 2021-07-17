import { Announcement } from "@core/announcement";
import Image from "@core/image";
import { ServiceResponse } from "@shared/utils/service-response";

export class ShowAnnouncementService {
  async execute(announcementId: number): Promise<ServiceResponse<Announcement>> {
    try {
      const announcement = await Announcement.findOne({
        where: { id: announcementId },
        attributes: ['id', 'name', 'active'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded'],
          }
        ],
      });

      if (!announcement) throw new Error('Anúncio inválido');

      return { result: announcement, err: null };
    } catch(err) {
      return { result: null, err: err.message };
    }
  };
};
