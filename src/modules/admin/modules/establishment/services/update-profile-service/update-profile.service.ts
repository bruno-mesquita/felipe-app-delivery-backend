/**

 * @fileoverview Criação do serviço para atualização do perfil do estabelecimento

 *

 * @author Jonatas Rosa Moura

 */

import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';

import EstablishmentRepository from '@modules/establishment/typeorm/repository/establishments.repository';

import { UpdateEstablishmentDto } from '../../dtos/update-establishment-dto';

import updateEstablishmentValidation from '../../validation/update-establishment-validation';

class UpdateProfileEstablishmentService {
  async execute(updateEstablishmentDto: UpdateEstablishmentDto): Promise<ServiceResponse<boolean>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);

      // Validando dto

      const valid = updateEstablishmentValidation.isValidSync(updateEstablishmentDto);

      if (!valid) throw new Error('Dados inválidos');

      // verificando se o estabelecimento existe

      const establishment = await establishmentRepository.findById(updateEstablishmentDto.id);

      if (!establishment) throw new Error('Estabelecimento não encontrado.');

      if (establishment.isActive()) throw new Error('Esse estabelecimento não se encontra ativo');

      const { name, email, cellphone } = updateEstablishmentDto;

      establishment.updateProfile(name, email, cellphone);

      await establishmentRepository.save(establishment);

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}

export default UpdateProfileEstablishmentService;
