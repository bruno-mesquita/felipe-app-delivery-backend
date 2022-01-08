import { Announcement } from "@core/announcement";
import Image from "@core/image";
import ApiError from "@shared/utils/ApiError";

export class ShowAnnouncementService {
  async execute(announcementId: number): Promise<any> {
    try {
      const announcement = await Announcement.findOne({
        where: { id: announcementId },
        attributes: ['id', 'name', 'active'],
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded'],
          }
        ],
      });

      if (!announcement) throw new ApiError('Anúncio inválido');

      return { result: announcement, err: null };
    } catch(err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  };
};
