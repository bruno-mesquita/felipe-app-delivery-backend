import { ServiceResponse } from '@shared/utils/service-response';
import Client from '@core/client';

export class DeactiveteClientService {
  async execute(client: Client): Promise<ServiceResponse<boolean>> {
    try {
      client.deactivate();
      await client.save();

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}
