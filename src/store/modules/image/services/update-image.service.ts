import Establishment from '@core/establishment';
import Image from '@core/image';
import ApiError from '@shared/utils/ApiError';
import { UpdateImageDto } from '../dtos/update-image.dto';
import imageUpdateValidation from '../validation/update-image.validation';

export class UpdateImageService {
  async execute({ encoded, establishmentId }: UpdateImageDto): Promise<void> {
    try {
      const valid = imageUpdateValidation.isValidSync({ encoded, establishmentId });

      if (!valid) throw new ApiError('Dados inválidos');

      const establishment = await Establishment.findOne({
        where: { id: establishmentId, active: true },
        include: [
          {
            model: Image,
            as: 'image',
            attributes: ['id', 'encoded'],
          },
        ],
      });

      await establishment.image?.update({ encoded });
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
