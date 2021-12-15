import { Announcement } from "@core/announcement";
import Image from "@core/image";
import { ServiceResponse } from "@utils/service-response";
import { CreateAnnouncementDto } from "../../dtos/create-announcement.dto";
import { createAnnouncementValidate } from '../../validations/create-announcement.validation';

export class CreateAnnouncementService {
  async execute(createAnnouncement: CreateAnnouncementDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = createAnnouncementValidate.isValidSync(createAnnouncement);

      if (!valid) throw new Error('Dados inválidos');

      const image = await Image.create({ encoded: createAnnouncement.image });

      await Announcement.create({
        name: createAnnouncement.name,
        active: createAnnouncement.active,
        image_id: image.getId(),
      });

      return { result: true, err: null };
    } catch(err) {
      return { result: false, err: err.message };
    }
  };
};
