/**

 * @fileoverview serviço de listagem dos estabelecimentos

 *

 * @author Jonatas Rosa Moura

 */

import { getCustomRepository } from 'typeorm';
import { Establishment } from '@modules/establishment';
import EstablishmentRepository from '@modules/establishment/typeorm/repository/establishments.repository';

class ListEstablishmentService {
  async execute(): Promise<Establishment[]> {
    const establishmentsRepository = getCustomRepository(EstablishmentRepository);

    const establishments = await establishmentsRepository.find();

    return establishments;
  }
}

export default ListEstablishmentService;
