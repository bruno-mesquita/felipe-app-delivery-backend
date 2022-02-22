import { Announcement } from '@core/announcement';
import ApiError from '@shared/utils/ApiError';

export class DeleteAnnouncementService {
  async execute(announcementId: number): Promise<any> {
    try {
      const announcement = await Announcement.findOne({
        where: { id: announcementId },
      });

      if (!announcement) throw new ApiError('Anúncio não encontrado');

      await announcement.destroy();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
