import Admin from "@core/admin";
import { Announcement } from "@core/announcement";
import { ServiceResponse } from "@shared/utils/service-response";

export class ListAnnouncementService {
  async execute(adminId: number): Promise<ServiceResponse<Announcement[]>> {
    try {
      const admin = await Admin.findOne({
        where: { id: adminId },
      });

      if (!admin) throw new Error('Usuário inválido');

      const announcement = await Announcement.findAll();

      return { result: announcement, err: null };
    } catch(err) {
      return { result: [], err: err.message };
    }
  };
};
