import Freight from '@core/Freight';
import ApiError from '@shared/utils/ApiError';

export class FreightRepository {
  async findOne(freightId: number): Promise<Freight> {
    try {
      const freight = await Freight.findByPk(freightId);

      if (!freight) throw new ApiError('Frete não encontrado');

      return freight;
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao buscar');
    }
  }

  async deleteOne(freightId: number): Promise<void> {
    try {
      const freight = await this.findOne(freightId);

      await freight.destroy();
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao deletar');
    }
  }

  async updateOne({ freightId, ...values }: any): Promise<void> {
    try {
      const freight = await this.findOne(freightId);

      await freight.update(values);
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao atualizar');
    }
  }
}
