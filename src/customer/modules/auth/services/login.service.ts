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

class LoginClientService {
  async execute(loginDto: LoginClientDto): Promise<ServiceResponse<any | null>> {
    try {
      if (!loginValidation.isValidSync(loginDto)) throw new Error('Dados inválidos');

      const clientRepository = getCustomRepository(ClientRepository);
      const clientAddressesRepository = getCustomRepository(AddressClientRepository);
      const tokenManager = new TokenManager();

      // Procurar pelo e-mail e pegar o avatar desse cliente

      const client = await clientRepository.findOne({
        where: { email: loginDto.email },
        relations: ['image'],
      });

      if (!client) throw new Error('[erro]: E-mail ou senha incorreto');

      // Comparar senha digitada do cliente com a que foi salva no banco

      if (!client.comparePassword(loginDto.password)) {
        throw new Error('Credenciais inválidas');
      }

      // Todos os endereços do cliente

      const adresses = await clientAddressesRepository.find({
        where: { client_id: client.id },
        relations: ['address_id'],
      });

      // Criando token

      const token = tokenManager.create(client.getId());

      return {
        result: {
          token,
          client: {
            name: client.name,
            avatar: client.image,
            cpf: client.cpf,
            phone: client.cellphone,
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
