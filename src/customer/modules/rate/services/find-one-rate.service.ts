import Evaluation from "@core/evaluation";
import { ServiceResponse } from "@shared/utils/service-response";


export class FindOneRateService {
  async execute(id: number): Promise<ServiceResponse<Evaluation | null>> {
    try {
      const rate = await Evaluation.findOne({ where: { id }, attributes: ['message', 'value'] });

      if(!rate) throw new Error('Evaliação não encontrada');

      return { err: null, result: rate }
    } catch (err) {
      return { err: err.message, result: null }
    }
  }
}
