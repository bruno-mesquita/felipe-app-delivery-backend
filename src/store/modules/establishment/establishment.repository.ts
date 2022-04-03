import Establishment from '@core/establishment';
import ApiError from '@shared/utils/ApiError';

export class EstablishmentRepository {
  async findOne(establishmentId: number): Promise<Establishment> {
    try {
      const partner = await Establishment.findByPk(establishmentId);

      if (!partner) throw new ApiError('Parceiro não encontrado');

      return partner;
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro ao procurar');
    }
  }
}
