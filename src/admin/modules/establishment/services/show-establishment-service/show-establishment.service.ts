/**
 * @fileoverview serviço de exibição de um estabelecimento
 *
 * @author Jonatas Rosa Moura
 */
import Establishment from '@core/establishment';

import { ServiceResponse } from '@shared/utils/service-response';

class ShowEstablishmentService {
  async execute(id: number): Promise<ServiceResponse<Establishment | null>> {
    try {
      const establishment = await Establishment.findOne({
        where: { id },
        attributes: ['image_id', 'name', 'email', 'cellphone', 'opening_time', 'closing_time','freight_value', 'active' ],
      });

      if (!establishment) {
        throw new Error('Estabelecimento não encontrado.');
      }

      return { result: establishment, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export default ShowEstablishmentService;
