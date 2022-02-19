import Neighborhood from '@core/neighborhood';
import ApiError from '@shared/utils/ApiError';
import type { ICreateNeighborhood, IUpdateNeighborhood, IDeleteNeighborhood } from './dtos';

class NeighborhoodRepository {
  private async findOne(id: number): Promise<Neighborhood> {
    try {
      const neighborhood = await Neighborhood.findByPk(id);

      if(!neighborhood) throw new ApiError('Bairro não encontrado');

      return neighborhood;
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao procurar bairro');
    }
  }

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

  async updateOne({ id, ...model }: IUpdateNeighborhood): Promise<void> {
    try {
      const neighborhood = await Neighborhood.findByPk(id);

      if(!neighborhood) throw new ApiError('Bairro não encontrado');

      await neighborhood.update(model);
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao atualizar bairro');
    }
  }

  async deleteOne({ id }: IDeleteNeighborhood): Promise<void> {
    try {
      const neighborhood = await this.findOne(id);

      await neighborhood.destroy();
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao deletar bairro');
    }
  }
}

export default NeighborhoodRepository;
