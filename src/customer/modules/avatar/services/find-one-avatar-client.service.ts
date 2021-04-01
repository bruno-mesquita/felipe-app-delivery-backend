import { getConnection } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import Client from '@core/client';

class FindOneAvatarClientClientService {
  async execute(userId: string): Promise<ServiceResponse<string | null>> {
    try {
      const image = await getConnection().createQueryBuilder().relation(Client, 'image').of(userId).loadOne();

      return { result: image ? image.getEncoded() : null, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { FindOneAvatarClientClientService };
