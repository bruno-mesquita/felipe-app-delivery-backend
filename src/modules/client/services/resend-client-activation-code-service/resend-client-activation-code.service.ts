/**
 * @fileoverview Criação do serviço para reenvio do codigo de ativação
 *
 * @author Bruno Mesquita
 */
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import { ServiceResponse } from '@shared/utils/service-response';
import ClientRepository from '@modules/client/typeorm/repository';
import ClientActivationCodeRepository from '@modules/client-activation-code/typeorm/repository';
import SmsService from '@modules/sms';

class ResendClientActivationCodeService {
  async execute(clientId: string): Promise<ServiceResponse<boolean>> {
    try {
      const smsService = new SmsService();
      const clientRepository = getCustomRepository(ClientRepository);
      const clientActivationCodeRepository = getCustomRepository(ClientActivationCodeRepository);

      // Verificando se o id é valido
      if (validate(clientId)) throw new Error('Id inválido');

      const client = await clientRepository.findById(clientId);

      if (!client) throw new Error('Cliente não encontrado');

      const clientActivationCode = await clientActivationCodeRepository.findOneByClientId(client.getId());

      if (!clientActivationCode) throw new Error('Codigo de ativação não encontrado');

      const code = clientActivationCode.generateCode();

      const result = await smsService.send(client.cellphone, code);

      if (!result) throw new Error('Erro ao enviar o codigo');

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}

export default ResendClientActivationCodeService;
