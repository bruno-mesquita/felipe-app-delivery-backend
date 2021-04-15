/**
 * @fileoverview Criação do serviço para ativação do cliente
 *
 * @author Bruno Mesquita
 */
import Client from '@core/client';
import ClientActivationCode from '@core/client-activation-code';
import { ServiceResponse } from '@shared/utils/service-response';

class ActiveClientService {
  async execute(code: string, clientId: number): Promise<ServiceResponse<boolean>> {
    try {
      // verificar se o usuário existe
      const user = await Client.findOne({ where: { id: clientId, active: false } });

      if (!user) throw new Error('Cliente não encontrado');

      if (user.active) throw new Error('Esse usuário já se encontra ativo');

      const clientActivationCode = await ClientActivationCode.findOne({ where: { client_id: clientId } });

      if (!clientActivationCode) throw new Error('Erro ao pegar codigo de ativação');

      if (!clientActivationCode.compareCode(code)) throw new Error('Codigo inválido');

      user.activate();

      await Client.update(user, { where: {  id: user.id } });
      await ClientActivationCode.destroy({ where: { id: clientActivationCode.id } });

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}

export default ActiveClientService;
