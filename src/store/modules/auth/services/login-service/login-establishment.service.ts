/**
 * @fileoverview Service de login do app do cliente
 *
 * @author Jonatas Rosa Moura
 */

import { EstablishmentRepository } from '@admin/modules/establishment/repository';
import { ServiceResponse } from '@shared/utils/service-response';
import TokenManager from '@shared/utils/token-manager';
import { getCustomRepository } from 'typeorm';
import { compareSync, hashSync } from 'bcryptjs'; // Teste senha
import { LoginEstablishmentDto } from '../../dtos/login-establishment';
import { IEstablishmentAuth } from '../../dtos/login-token-dto';
import loginValidation from '../../validation/login-establishment.validation';

export class LoginEstablishmentLoginService {
  async execute(loginEstablishment: LoginEstablishmentDto): Promise<ServiceResponse<IEstablishmentAuth | null>> {
    try {
      if (!loginValidation.isValidSync(loginEstablishment)) throw new Error('Dados inválidos.');

      const establishmentRepository = getCustomRepository(EstablishmentRepository);
      const tokenManager = new TokenManager();

      const establishment = await establishmentRepository.findByEmail(loginEstablishment.email);

      if (!establishment) {
        throw new Error('Estabelecimento não encontrado.');
      }

      console.log(compareSync(loginEstablishment.password, establishment.password));

      console.log(establishment.comparePassword(loginEstablishment.password));

      if (!establishment.comparePassword(loginEstablishment.password)) {
        throw new Error('Credenciais inválidas.');
      }

      const token = tokenManager.create(establishment.getId());

      return { result: { token, establishment }, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
