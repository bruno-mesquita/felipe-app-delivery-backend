/**
 * @fileoverview serviço de listagem dos estabelecimentos
 *
 * @author Jonatas Rosa Moura
 */

import { getCustomRepository } from 'typeorm';

import Establishment from '@core/establishment';

import { EstablishmentRepository } from '../../repository';

class ListEstablishmentService {
  async execute(): Promise<Establishment[]> {
    const establishmentsRepository = getCustomRepository(EstablishmentRepository);

    const establishments = await establishmentsRepository.find();

    return establishments;
  }
}

export default ListEstablishmentService;
