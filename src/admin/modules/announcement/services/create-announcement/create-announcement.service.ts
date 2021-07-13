import { Announcement } from "@core/announcement";
import { ServiceResponse } from "@shared/utils/service-response";
import { CreateAnnouncementDto } from "../../dtos/create-announcement.dto";
import { createAnnouncementValidate } from '../../validations/create-announcement.validation';

export class CreateAnnouncementService {
  async execute(createAnnouncement: CreateAnnouncementDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = createAnnouncementValidate.isValidSync(createAnnouncement);

      if (!valid) throw new Error('Dados inválidos');

      await Announcement.create({
        name: createAnnouncement.name,
        active: createAnnouncement.active,
        photo: { encoded: createAnnouncement.image },
      }, {
        include: [Announcement.Photo],
      });

      return { result: true, err: null };
    } catch(err) {
      return { result: false, err: err.message };
    }
  };
};
