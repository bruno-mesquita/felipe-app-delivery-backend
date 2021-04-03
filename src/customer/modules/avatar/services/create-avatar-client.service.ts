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

      const client = await Client.findOne({ where: { id: createAvatar.client_id }, include: [{ model: Image }] });

      if (!client) throw new Error('[Avatar]: Usuário não econtrado.');

      if (client.getImage()) {
        client.getImage().setEncoded(createAvatar.encoded);
        client.getImage().setName(createAvatar.name);


      } else {
        // Criando classe
        const avatar = await Image.create(createAvatar);

        // Anexar Avatar ao Usuário
        client.image = avatar;

        // Salvando no DB
        await Client.update(client, { where: { id: client.id } });
      }

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}

export { CreateAvatarClientService };
