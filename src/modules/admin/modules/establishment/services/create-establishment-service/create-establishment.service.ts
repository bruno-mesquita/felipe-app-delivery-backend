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
import { CreateEstablishmentDto } from '../../dtos/create-establishment-dto';
import createEstablishmentSchema from '../../validation/create-client.validation';

class CreateEstablishmentService {
  public async execute(establishmentProps: CreateEstablishmentDto): Promise<ServiceResponse<Establishment | null>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);
      const emailExists = await establishmentRepository.findByEmail(establishmentProps.email);
      const cellphoneExists = await establishmentRepository.findByCellphone(establishmentProps.cellphone);

      // Verificar se o email já existe

      if (emailExists) {
        throw new Error('Email já cadastrado.');
      }

      // Verificar se o contato já existe

      if (cellphoneExists) {
        throw new Error('Número de contato já cadastrado.');
      }

      // Verificando se as senhas são iguais

      if (establishmentProps.confirmPassword !== establishmentProps.password) {
        throw new Error('Senhas não são iguais.');
      }

      // Fazendo Validação do DTO

      const valid = createEstablishmentSchema.isValidSync(establishmentProps);

      if (!valid) throw new Error('Por favor reveja seus dados.');

      // Criando a classe
      const establishment = establishmentRepository.create(establishmentProps);

      // Salvando no db
      await establishmentRepository.save(establishment);

      return { result: establishment, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export default CreateEstablishmentService;
