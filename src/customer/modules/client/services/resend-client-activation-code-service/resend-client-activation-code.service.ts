/**

 * @fileoverview Criação do serviço para reenvio do codigo de ativação

 *

 * @author Bruno Mesquita

 */
import { validate } from 'uuid';

import { ServiceResponse } from '@shared/utils/service-response';
import SmsService from '@shared/utils/sms';

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

      const clientActivationCode = await clientActivationCodeRepository.findByClientId(client.getId());

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
