/**
 * @fileoverview Service de login do app do cliente
 *
 * @author Bruno Mesquita
 */

import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import TokenManager from '@shared/utils/token-manager';
import ClientRepository from '@customer/modules/client/client.repository';
import { AddressClientRepository } from '@customer/modules/address-client/repository/AddressClientRepository';
import { LoginClientDto } from '../dtos/login-client.dto';
import loginValidation from '../validation/login.validation';
import { IClientAuth } from '../dtos/login-token-dto';

class LoginClientService {
  async execute(loginDto: LoginClientDto): Promise<ServiceResponse<any | null>> {
    try {
      if (!loginValidation.isValidSync(loginDto)) throw new Error('Dados inválidos');

      const clientRepository = getCustomRepository(ClientRepository);
      const clientAddresses = getCustomRepository(AddressClientRepository);
      const tokenManager = new TokenManager();

      const client = await clientRepository.findByEmail(loginDto.email);

      if (!client) throw new Error('[erro]: E-mail ou senha incorreto');

      // Comparar senha digitada do cliente com a que foi salva no banco

      if (!client.comparePassword(loginDto.password)) {
        throw new Error('Credenciais inválidas');
      }

      const adresses = await clientAddresses.find({
        where: { client_id: client.id },
        relations: ['address_id'],
      });

      // Criando token

      const token = tokenManager.create(client.getId());

      console.log({ token, client });

      return {
        result: {
          token,
          client: {
            name: client.name,
            cpf: client.cpf,
            cellphone: client.cellphone,
            email: client.email,
            adresses,
          },
        },
        err: null,
      };
    } catch (err) {
      return { result: null, err: 'Erro no login' };
    }
  }
}

export { LoginClientService };
