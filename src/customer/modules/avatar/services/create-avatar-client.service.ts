import Client from '@core/client';
import Image from '@core/image';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { ICreateAvatarDto } from '../dtos';

export class CreateAvatarClientService {
  async execute(createAvatar: ICreateAvatarDto): Promise<ServiceResponse<boolean | null>> {
    try {
      // Verificando se o usuário existe
      const client = await Client.findOne({
        where: { id: createAvatar.clientId, active: true },
      });

      if (!client) throw new ApiError('Usuário não econtrado.');

      if (client.avatar_id) {
        const avatar = await client.getAvatar({
          attributes: ['name', 'encoded', 'id'],
        });

        await avatar.update({ encoded: createAvatar.encoded });
      } else {
        // Criando classe
        const avatar = await Image.create({ encoded: createAvatar.encoded });

        // Salvando no DB
        await client.update({ avatar_id: avatar.id });
      }

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
