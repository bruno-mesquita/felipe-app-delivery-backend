/**
 * @fileoverview Criação do serviço para reenvio do codigo de ativação
 */

import Client from '@core/client';
import ClientActivationCode from '@core/client-activation-code';
import { ServiceResponse } from '@shared/utils/service-response';
import SmsService from '@shared/utils/sms';

class ResendClientActivationCodeService {
  async execute(clientId: string): Promise<ServiceResponse<boolean>> {
    try {
      const smsService = new SmsService();


      const client = await Client.findByPk(clientId);

      if (!client) throw new Error('Cliente não encontrado');

      const clientActivationCode = await ClientActivationCode.findOne({
        where: { client_id: client.id }
      });

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
