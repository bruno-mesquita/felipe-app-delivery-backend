import Establishment from "@core/establishment";
import Image from "@core/image";
import { ServiceResponse } from "@shared/utils/service-response";
import { UpdateImageDto } from "../dtos/update-image.dto";
import imageUpdateValidation from '../validation/update-image.validation';

export class UpdateImageService {
  async execute(updateImageDto: UpdateImageDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = imageUpdateValidation.isValidSync(updateImageDto);

      if (!valid) throw new Error('Dados inválidos');

      const establishment = await Establishment.findOne({
        where: { id: updateImageDto.id, active: true },
        attributes: ['image_id']
      });

      if (!establishment) throw new Error('Estabelecimento não encontrado');

      const image = await Image.findByPk(establishment.image_id);

      if (!image) throw new Error('Image do Estabelecimento não encontrada');

      const { encoded } = updateImageDto;

      image.setEncoded(encoded);

      await image.save();

      return { result: true, err: null }
    } catch(err) {
      return { result: false, err: err.message };
    }
  };
}
