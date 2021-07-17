import { Announcement } from "@core/announcement";
import Image from "@core/image";
import { ServiceResponse } from "@shared/utils/service-response";

export class ListAnnouncementService {
  async execute(): Promise<ServiceResponse<any>> {
    try {
      const announcement = await Announcement.findAll({
        where: { active: true },
        attributes: {
          exclude: [
            'id', 'name', 'active', 'createdAt', 'updatedAt', 'image_id'
          ]
        },
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
