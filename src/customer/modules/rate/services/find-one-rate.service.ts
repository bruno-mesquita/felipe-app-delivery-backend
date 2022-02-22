import Evaluation from '@core/evaluation';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';

export class FindOneRateService {
  async execute(id: number): Promise<ServiceResponse<Evaluation>> {
    try {
      const rate = await Evaluation.findOne({
        where: { id },
        attributes: ['message', 'value'],
      });

      if (!rate) throw new ApiError('Avaliação não encontrada');

      return { err: null, result: rate };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
