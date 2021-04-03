import Image from '@core/image';
import { ServiceResponse } from '@shared/utils/service-response';

import { CreateImageDto } from '../../../images/create-image-dto';
import { schema } from '../../../images/create-image-validation';

class CreateImageProductService {
  async execute(createImageDto: CreateImageDto): Promise<ServiceResponse<Image | null>> {
    try {
      const imageRepository = getCustomRepository(ImagesRepository);
      const productRepository = getCustomRepository(ProductRepository);

      // Validar dados

      const valid = schema.isValidSync(createImageDto);

      if (!valid) throw new Error('[Image]: Parâmetros incompletos, verifique-os');

      // Verificando se o produtos existe

      const product = await productRepository.findById(createImageDto.id);

      if (!product) throw new Error('[Image]: Produto não encontrado.');

      // Criando classe e salvando no DB

      const image = imageRepository.create(createImageDto);

      await imageRepository.save(image);

      // Anexar Image ao Produto e salvando no DB

      product.setImage(image);

      await productRepository.save(product);

      return { result: image, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { CreateImageProductService };
