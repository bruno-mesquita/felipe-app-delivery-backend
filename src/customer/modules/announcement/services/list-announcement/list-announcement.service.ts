import { Announcement } from "@core/announcement";
import { ServiceResponse } from "@shared/utils/service-response";

export class ListAnnouncementService {
  async execute(): Promise<ServiceResponse<any>> {
    try {
      const announcement = await Announcement.findAll({
        where: { active: true },

        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      return { result: announcement, err: null };
    } catch(err) {
      return { result: [], err: err.message };
    }
  };
};
