import { getCustomRepository } from 'typeorm';
import Image from '@core/image';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateImageDto } from '../../images/create-image-dto';
import { schema } from '../../images/create-image-validation';
import { ImagesRepository } from '../../images/images-repository';
import { EstablishmentRepository } from '../establishment-repository';

export class CreateImageService {
  async execute(createImageDto: CreateImageDto): Promise<ServiceResponse<Image | null>> {
    try {
      const imageRepository = getCustomRepository(ImagesRepository);
      const establishmentRepository = getCustomRepository(EstablishmentRepository);

      // Validando

      const valid = schema.isValidSync(createImageDto);

      if (!valid) throw new Error('[Image]: Dados inválidos.');

      // Verificando se o estabelecimento existe

      const establishment = await establishmentRepository.findById(createImageDto.id);

      if (!establishment) throw new Error('[Image]: Estabelecimento não encontrado.');

      // Criando classe

      const image = imageRepository.create(createImageDto);

      await imageRepository.save(image);

      return { result: image, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
