import { Announcement } from '@core/announcement';
import Image from '@core/image';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

export class ListAnnouncementService {
  async execute(): Promise<ServiceResponse<Announcement[]>> {
    try {
      const announcements = await Announcement.findAll({
        where: { active: true },
        attributes: {
          exclude: ['name', 'active', 'createdAt', 'updatedAt', 'image_id'],
        },
        include: [
          {
            model: Image,
            as: 'photo',
            attributes: ['encoded'],
          },
        ],
        limit: 15,
      });

      return { result: announcements, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
