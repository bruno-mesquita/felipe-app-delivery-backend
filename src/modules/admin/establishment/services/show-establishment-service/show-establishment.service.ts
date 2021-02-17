/**

 * @fileoverview serviço de exibição de um estabelecimento

 *

 * @author Jonatas Rosa Moura

 */

import { getCustomRepository } from 'typeorm';

import { Establishment } from '@modules/establishment';
import EstablishmentRepository from '@modules/establishment/typeorm/repository/establishments.repository';

interface IRequest {
  id: string;
}

class ShowEstablishmentService {
  async execute({ id }: IRequest): Promise<Establishment | undefined> {
    const establishmentRepository = getCustomRepository(EstablishmentRepository);

    const establishment = establishmentRepository.findById(id);

    if (!establishment) {
      throw new Error('Estabelecimento não encontrado.');
    }

    return establishment;
  }
}

export default ShowEstablishmentService;
