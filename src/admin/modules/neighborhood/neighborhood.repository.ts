import Neighborhood from '@core/neighborhood';
import ApiError from '@shared/utils/ApiError';
import type { ICreateNeighborhood } from './dtos';

class NeighborhoodRepository {
  async create(model: ICreateNeighborhood): Promise<number> {
    try {
      const entity = await Neighborhood.create(model);

      return entity.getId();
    } catch (err) {
      throw new ApiError('erro ao cadastrar bairro');
    }
  }

  async createMany(models: ICreateNeighborhood[]): Promise<void> {
    try {
      await Neighborhood.bulkCreate(models);
    } catch (err) {
      throw new ApiError('erro ao cadastrar bairro');
    }
  }
}

export default NeighborhoodRepository;
