import Admin from "@core/admin";
import { Announcement } from "@core/announcement";
import { ServiceResponse } from "@shared/utils/service-response";

export class ShowAnnouncementService {
  async execute(adminId: number, announcementId: number): Promise<ServiceResponse<Announcement>> {
    try {
      const admin = await Admin.findOne({
        where: { id: adminId },
      });

      if (!admin) throw new Error('Usuário inválido');

      const announcement = await Announcement.findOne({
        where: { id: announcementId },
      });

      if (!announcement) throw new Error('Anúncio inválido');

      return { result: announcement, err: null };
    } catch(err) {
      return { result: null, err: err.message };
    }
  };
};
