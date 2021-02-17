/**
 * @fileoverview Casos de testes para a criação do estabelecimento
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { getCustomRepository } from 'typeorm';

import EstablishmentRepository from '@modules/establishment/typeorm/repository/establishments.repository';
import Establishment from '@modules/establishment/typeorm/entity';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateEstablishmentDto } from '../dtos/create-establishment-dto';
import createEstablishmentSchema from '../validation/create-client.validation';

class CreateEstablishmentService {
  public async execute(establishmentProps: CreateEstablishmentDto): Promise<ServiceResponse<Establishment | null>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);
      const emailExists = await establishmentRepository.findByEmail(establishmentProps.email);
      const cellphoneExists = await establishmentRepository.findByCellphone(establishmentProps.cellphone);

      if (emailExists) {
        throw new Error('Email não encontrado.');
      }

      if (cellphoneExists) {
        throw new Error('Número de contato não encontrado.');
      }

      if (establishmentProps.confirmPassword !== establishmentProps.password) {
        throw new Error('Senhas não são iguais.');
      }

      const valid = createEstablishmentSchema.isValidSync(establishmentProps);

      if (!valid) throw new Error('Por favor reveja seus dados.');

      const establishment = establishmentRepository.create(establishmentProps);

      await establishmentRepository.save(establishment);

      return { result: establishment, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export default CreateEstablishmentService;
