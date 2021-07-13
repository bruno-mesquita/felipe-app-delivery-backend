import Admin from '@core/admin';
import { Announcement } from '@core/announcement';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateAnnouncementDto } from '../../dtos/update-announcement.dto';
import { updateAnnouncementValidate } from '../../validations/update-announcement.validation';

export class UpdateProductService {
  async execute(updateAnnouncement: UpdateAnnouncementDto): Promise<ServiceResponse<boolean>> {
    try {
      console.log(updateAnnouncement);
      // validando e fazendo verificações

      const valid = updateAnnouncementValidate.isValidSync(updateAnnouncement);

      if (!valid) throw new Error('Dados inválidos');

      const admin = Admin.findOne({ where: { id: updateAnnouncement.adminId } });

      if (!admin) throw new Error('Admin não encontrado');

      const announcement = await Announcement.findByPk(updateAnnouncement.id);

      if (!announcement) throw new Error('Anúncio não encontrado.');

      // Editando classe e Salvando no DB

      const { name, image, active } = updateAnnouncement;

      announcement.updateAnnouncement(name, active);

      const photo = await announcement.getPhoto();

      photo.setEncoded(image);

      await photo.save();
      await announcement.save();

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: null };
    }
  }
}
