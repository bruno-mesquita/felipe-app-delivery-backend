import Image from '@core/image';
import ApiError from '@shared/utils/ApiError';

class ImageRepository {
  async findOne(id: number): Promise<Image> {
    try {
      const image = await Image.findByPk(id, { attributes: ['id', 'encoded'] });

      if (!image) throw new ApiError('Imagem não encontrada');

      return image;
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao buscar imagem');
    }
  }
}

export default ImageRepository;
