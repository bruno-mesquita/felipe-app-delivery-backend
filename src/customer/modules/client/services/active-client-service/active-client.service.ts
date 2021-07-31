/**
 * @fileoverview Criação do serviço para ativação do cliente
 *
 * @author Bruno Mesquita
 */
import Client from '@core/client';
import { ServiceResponse } from '@shared/utils/service-response';

class ActiveClientService {
  async execute(clientId: number): Promise<ServiceResponse<boolean>> {
    try {
      // verificar se o usuário existe
      const user = await Client.findOne({ where: { id: clientId, active: false } });

      if (!user) throw new Error('Cliente não encontrado');

      user.activate();

      await user.save();

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}

export default ActiveClientService;
