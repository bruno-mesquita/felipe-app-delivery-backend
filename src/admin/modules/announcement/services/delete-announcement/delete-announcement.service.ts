import Admin from "@core/admin";
import { Announcement } from "@core/announcement";
import { ServiceResponse } from "@shared/utils/service-response";

export class DeleteAnnouncementService {
  async execute(adminId: number, announcementId: number): Promise<ServiceResponse<boolean>> {
    try {
      const admin = Admin.findOne({ where: { id: adminId } });

      if (!admin) throw new Error('Admin inválido');

      const announcement = await Announcement.findOne({ where: { id: announcementId } });

      if (!announcement) throw new Error('Anúncio não encontrado');

      await announcement.destroy();

      return { result: true, err: null };
    } catch(err) {
      return { result: false, err: err.message };
    }
  };
};
