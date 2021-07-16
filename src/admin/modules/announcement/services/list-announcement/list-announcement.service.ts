import { Announcement } from "@core/announcement";
import Image from "@core/image";
import { ServiceResponse } from "@shared/utils/service-response";

export class ListAnnouncementService {
  async execute(adminId: number): Promise<ServiceResponse<Announcement[]>> {
    try {
      const announcement = await Announcement.findAll({
        attributes: ['id', 'name', 'active'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded'],
          }
        ],
      });

      return { result: announcement, err: null };
    } catch(err) {
      return { result: [], err: err.message };
    }
  };
};
