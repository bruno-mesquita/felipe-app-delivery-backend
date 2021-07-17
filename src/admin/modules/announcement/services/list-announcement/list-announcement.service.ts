import { Announcement } from "@core/announcement";
import { ServiceResponse } from "@shared/utils/service-response";

export class ListAnnouncementService {
  async execute(): Promise<ServiceResponse<Announcement[]>> {
    try {
      const announcement = await Announcement.findAll({
        attributes: ['id', 'name', 'active'],
      });

      return { result: announcement, err: null };
    } catch(err) {
      return { result: [], err: err.message };
    }
  };
};
