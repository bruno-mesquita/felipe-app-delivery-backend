import { ServiceResponse } from '@shared/utils/service-response';
import Client from '@core/client';
import Image from '@core/image';

export default class ProfileClientService {
  async execute(id: string): Promise<ServiceResponse<any>> {
    try {
      const client = await Client.findOne({
        where: { id },
        attributes: ['id','name', 'email', 'cpf', 'cellphone'],
        include: [
          {
            model: Image,
            as: 'avatar',
            attributes: ['name', 'encoded'],
          }
        ]
      })

      if(!client) throw new Error('Cliente não encontrado');

      return {
        result: { ...client.toJSON(), avatar: client.avatar.encoded },
        err: null,
      };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
