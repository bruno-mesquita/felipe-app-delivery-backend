import { Announcement } from "@core/announcement";
import Image from "@core/image";
import ApiError from "@shared/utils/ApiError";
import { CreateAnnouncementDto } from "../../dtos/create-announcement.dto";
import { createAnnouncementValidate } from '../../validations/create-announcement.validation';

export class CreateAnnouncementService {
  async execute(createAnnouncement: CreateAnnouncementDto): Promise<any> {
    try {
      const valid = createAnnouncementValidate.isValidSync(createAnnouncement);

      if (!valid) throw new ApiError('Dados inválidos');

      const image = await Image.create({ encoded: createAnnouncement.image });

      await Announcement.create({
        name: createAnnouncement.name,
        active: createAnnouncement.active,
        image_id: image.getId(),
      });

      return { result: true, err: null };
    } catch(err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  };
};
