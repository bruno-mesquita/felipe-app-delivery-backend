import Client from '@core/client';
import Image from '@core/image';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import { ICreateAvatarDto } from '../dtos';

export class CreateAvatarClientService {
  async execute(
    createAvatar: ICreateAvatarDto
  ): Promise<ServiceResponse<boolean | null>> {
    try {
      // Verificando se o usuário existe
      const client = await Client.findOne({
        where: { id: createAvatar.clientId, active: true },
      });

      if (!client) throw new ApiError('Usuário não econtrado.');

      if (client.getAvatarId()) {
        const clientAvatar = await client.getAvatar({
          attributes: ['name', 'encoded', 'id'],
        });

        clientAvatar.setEncoded(createAvatar.encoded);
        clientAvatar.setName(createAvatar.name);

        await clientAvatar.save();
      } else {
        // Criando classe
        const avatar = await Image.create(createAvatar);

        // Anexar Avatar ao Usuário
        client.setAvatar(avatar.getId());

        // Salvando no DB
        client.save();
      }

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
