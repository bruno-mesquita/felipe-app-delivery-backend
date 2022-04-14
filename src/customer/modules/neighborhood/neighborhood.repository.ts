import Neighborhood from '@core/neighborhood';
import ApiError from '@shared/utils/ApiError';

class NeighborhoodRepository {
  async list(cityId: number): Promise<Neighborhood[]> {
    try {
      return Neighborhood.findAll({
        where: {
          city: cityId,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao procurar bairro');
    }
  }
}

export default NeighborhoodRepository;
