import { ServiceResponse } from '@shared/utils/service-response';
import Client from '@core/client';
import Image from '@core/image';

class FindOneAvatarClientClientService {
  async execute(userId: number): Promise<ServiceResponse<string | null>> {
    try {
      const client = await Client.findOne({
        where: { id: userId, active: true },
        attributes: ['avatar_id'],
        include: [
          {
            model: Image,
            as: 'avatar',
            attributes: ['encoded'],
          }
        ]
      })

      return { result: client.avatar.getEncoded(), err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { FindOneAvatarClientClientService };
