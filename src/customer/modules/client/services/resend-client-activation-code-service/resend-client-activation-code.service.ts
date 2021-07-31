/**
 * @fileoverview Criação do serviço para reenvio do codigo de ativação
 */

import Client from '@core/client';
import { ServiceResponse } from '@shared/utils/service-response';
import SmsService from '@shared/utils/sms';

class ResendClientActivationCodeService {
  async execute(clientId: string): Promise<ServiceResponse<boolean>> {
    try {
      const smsService = new SmsService();

      const client = await Client.findByPk(clientId);

      if (!client) throw new Error('Cliente não encontrado');

      const result = await smsService.send(client.cellphone);

      if (!result) throw new Error('Erro ao enviar o codigo');

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: false };
    }
  }
}

export default ResendClientActivationCodeService;
