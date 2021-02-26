/**
 * @fileoverview Service de login do app do cliente
 *
 * @author Bruno Mesquita
 */

import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import TokenManager from '@shared/utils/token-manager';
import ClientRepository from '@customer/modules/client/client.repository';
import { LoginClientDto } from '../../dtos/login-client.dto';
import loginValidation from '../../validation/login.validation';
import { IClientAuth } from '../../dtos/login-token-dto';

class LoginClientService {
  async execute(loginDto: LoginClientDto): Promise<ServiceResponse<IClientAuth | null>> {
    try {
      if (!loginValidation.isValidSync(loginDto)) throw new Error('Dados inválidos');

      const clientRepository = getCustomRepository(ClientRepository);
      const tokenManager = new TokenManager();

      const client = await clientRepository.findByEmail(loginDto.email);

      if (!client) throw new Error('Usuário não encontrado');

      if (!client.comparePassword(loginDto.password)) {
        throw new Error('Credenciais inválidas');
      }

      const token = tokenManager.create(client.getId());

      return { result: { token, client }, err: null };
    } catch (err) {
      return { result: null, err: 'Erro no login' };
    }
  }
}

export { LoginClientService };
