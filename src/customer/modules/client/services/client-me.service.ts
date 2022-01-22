import Client from '@core/client';
import Image from '@core/image';

import ApiError from '@shared/utils/ApiError';

export class ClientMeService {
  async execute(id: number): Promise<any> {
    try {
      const client = await Client.findOne({
        where: { id, active: true },
        attributes: ['id', 'name', 'cpf', 'email', 'active', 'cellphone'],
        include: [{
          model: Image,
          as: 'avatar',
          attributes: ['encoded'],
        }]
      })

      if(!client) throw new ApiError('Cliente não encontrado');

      const user = client.toJSON()

      user['avatar'] = user?.avatar?.encoded || null


      return user
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
