import { ServiceResponse } from '@shared/utils/service-response';
import Client from '@core/client';
import Image from '@core/image';

class FindOneAvatarClientClientService {
  async execute(userId: string): Promise<ServiceResponse<string | null>> {
    try {
      const client = await Client.findOne({
        where: { id: userId },
        attributes: ['image'],
        include: [
          {
            model: Image,
            as: 'image',
            attributes: ['encoded'],
          }
        ]
      })

      return { result: client.getImage().getEncoded(), err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { FindOneAvatarClientClientService };
