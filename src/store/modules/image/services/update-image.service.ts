import Establishment from '@core/establishment';
import { EstablishmentOwner } from '@core/establishment-owner';
import Image from '@core/image';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateImageDto } from '../dtos/update-image.dto';
import imageUpdateValidation from '../validation/update-image.validation';

export class UpdateImageService {
  async execute(
    updateImageDto: UpdateImageDto
  ): Promise<ServiceResponse<boolean>> {
    try {
      const valid = imageUpdateValidation.isValidSync(updateImageDto);

      if (!valid) throw new ApiError('Dados inválidos');

      const owner = await EstablishmentOwner.findOne({
        where: { id: updateImageDto.onwerId },
        attributes: ['id'],
        include: [
          {
            model: Establishment,
            as: 'establishment',
            attributes: ['id'],
            where: { active: true },
            include: [
              {
                model: Image,
                as: 'image',
                attributes: ['id', 'encoded'],
              },
            ],
          },
        ],
      });

      if (!owner) throw new ApiError('Estabelecimento não encontrado');

      const { encoded } = updateImageDto;

      owner.establishment.image.setEncoded(encoded);

      await owner.establishment.image.save();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
