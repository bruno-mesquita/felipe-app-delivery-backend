import { ServiceResponse } from '@shared/utils/service-response';
import Client from '@core/client';

export default class ProfileClientService {
  async execute(id: string): Promise<ServiceResponse<any>> {
    try {
      const client = await Client.findOne({
        where: { id },
        attributes: ['id','name', 'email', 'cpf', 'cellphone'],
      })

      if(!client) throw new Error('Cliente não encontrado');

      return {
        result: client,
        err: null,
      };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
