/**
 * @fileoverview Criação do serviço para ativação do cliente
 *
 * @author Bruno Mesquita
 */

import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import { ServiceResponse } from '@shared/utils/service-response';
import ClientActivationCodeRepository from '@modules/client-activation-code/typeorm/repository';
import UserRepository from '../../typeorm/repository';

class ActiveClientService {
  async execute(code: string, clientId: string): Promise<ServiceResponse<boolean>> {
    try {
      const userRepository = getCustomRepository(UserRepository);
      const clientActivationCodeRepository = getCustomRepository(ClientActivationCodeRepository);

      // Verificar se o id é valido
      if (!validate(clientId)) throw new Error('id do usuário inválido');

      // verificar se o usuário existe
      const user = await userRepository.findById(clientId);

      if (!user) throw new Error('Cliente não encontrado');

      if (user.isActive()) throw new Error('Esse usuário já se encontra ativo');

      const clientActivationCode = await clientActivationCodeRepository.findOneByClientId(user.getId());

      if (!clientActivationCode) throw new Error('Erro ao pegar codigo de ativação');

      if (!clientActivationCode.compareCode(code)) throw new Error('Codigo inválido');

      user.activate();

      await userRepository.save(user);

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}

export default ActiveClientService;
