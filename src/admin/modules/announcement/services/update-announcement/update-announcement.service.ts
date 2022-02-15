import { Announcement } from '@core/announcement';
import ApiError from '@shared/utils/ApiError';
import { UpdateAnnouncementDto } from '../../dtos/update-announcement.dto';
import { updateAnnouncementValidate } from '../../validations/update-announcement.validation';

export class UpdateProductService {
  async execute(updateAnnouncement: UpdateAnnouncementDto): Promise<any> {
    try {
      // validando e fazendo verificações

      const valid = updateAnnouncementValidate.isValidSync(updateAnnouncement);

      if (!valid) throw new ApiError('Dados inválidos');

      const announcement = await Announcement.findOne({
        where: { id: updateAnnouncement.id },
      });

      if (!announcement) throw new ApiError('Anúncio não encontrado.');

      // Editando classe e Salvando no DB

      const { name, image, active } = updateAnnouncement;

      announcement.updateAnnouncement(name, active);

      if(updateAnnouncement.image) {
        const photo = await announcement.getPhoto();

        photo.setEncoded(image);

        await photo.save();
      };

      await announcement.save();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
