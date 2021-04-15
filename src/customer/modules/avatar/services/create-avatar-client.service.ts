import Client from '@core/client';
import Image from '@core/image';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateAvatarDto } from '../create-avatar-dto';
import { schema } from '../create-avatar-validation';

class CreateAvatarClientService {
  async execute(createAvatar: CreateAvatarDto): Promise<ServiceResponse<boolean | null>> {
    try {
      // Validar dados
      const valid = schema.isValidSync(createAvatar);

      if (!valid) throw new Error('[Avatar]: Parâmetros incompletos, verifique-os');

      // Verificando se o usuário existe

      const client = await Client.findOne({ where: { id: createAvatar.client_id, active: true } });

      if (!client) throw new Error('[Avatar]: Usuário não econtrado.');

      if (client.avatar_id) {
        const clientAvatar = await client.getAvatar({ attributes: ['name', 'encoded', 'id'] });

        clientAvatar.setEncoded(createAvatar.encoded);
        clientAvatar.setName(createAvatar.name);

        await clientAvatar.save();
      } else {
        // Criando classe
        const avatar = await Image.create(createAvatar);

        // Anexar Avatar ao Usuário
        client.setAvatar(avatar.id);

        // Salvando no DB
        client.save();
      }

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}

export { CreateAvatarClientService };
