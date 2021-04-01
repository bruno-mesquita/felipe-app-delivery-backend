import { getCustomRepository } from 'typeorm';

import { ServiceResponse } from '@shared/utils/service-response';
import { ClientRepository } from '../../client';
import { AvatarRepository } from '../avatar-repository';
import { CreateAvatarDto } from '../create-avatar-dto';
import { schema } from '../create-avatar-validation';

class CreateAvatarClientService {
  async execute(createAvatar: CreateAvatarDto): Promise<ServiceResponse<boolean | null>> {
    try {
      const avatarRepository = getCustomRepository(AvatarRepository);
      const clientRepository = getCustomRepository(ClientRepository);

      // Validar dados

      const valid = schema.isValidSync(createAvatar);

      if (!valid) throw new Error('[Avatar]: Parâmetros incompletos, verifique-os');

      // Verificando se o usuário existe

      const client = await clientRepository.findOne({ where: { id: createAvatar.client_id }, relations: ['image'] });

      if (!client) throw new Error('[Avatar]: Usuário não econtrado.');

      if (client.getImage()) {
        client.getImage().setEncoded(createAvatar.encoded);
        client.getImage().setName(createAvatar.name);

        await clientRepository.save(client);
      } else {
        // Criando classe
        const avatar = avatarRepository.create(createAvatar);

        await avatarRepository.save(avatar);

        // Anexar Avatar ao Usuário
        client.setImage(avatar);

        // Salvando no DB
        await clientRepository.save(client);
      }

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: err.message };
    }
  }
}

export { CreateAvatarClientService };
