/**

 * @fileoverview serviço de exibição de um estabelecimento

 *

 * @author Jonatas Rosa Moura

 */

import { getCustomRepository } from 'typeorm';

import { Establishment } from '@modules/establishment';
import EstablishmentRepository from '@modules/establishment/typeorm/repository/establishments.repository';
import { ServiceResponse } from '@shared/utils/service-response';

interface IRequest {
  id: string;
}

class ShowEstablishmentService {
  async execute({ id }: IRequest): Promise<ServiceResponse<Establishment | null>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);

      const establishment = await establishmentRepository.findById(id);

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
