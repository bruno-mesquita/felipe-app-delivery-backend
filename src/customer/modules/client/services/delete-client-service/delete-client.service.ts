/**
 * @fileoverview Criação do serviço responsavel pela remoção do cliente
 *
 * @author Bruno Mesquita
 */

import { ServiceResponse } from '@shared/utils/service-response';
import Client from '@core/client';

export class DeleteClientService {
  async execute(client: Client): Promise<ServiceResponse<any>> {
    try {
      client.deactivate();
      await client.toRemove();

      return { result: client, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
