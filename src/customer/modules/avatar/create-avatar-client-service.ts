import Image from '@core/image';
import { ServiceResponse } from '@shared/utils/service-response';
import { getCustomRepository } from 'typeorm';
import { ClientRepository } from '../client';

import { AvatarRepository } from './avatar-repository';
import { CreateAvatarDto } from './create-avatar-dto';
import { schema } from './create-avatar-validation';

class CreateAvatarClientService {
  async execute(createAvatar: CreateAvatarDto): Promise<ServiceResponse<Image | null>> {
    try {
      const avatarRepository = getCustomRepository(AvatarRepository);
      const clientRepository = getCustomRepository(ClientRepository);

      // Validar dados

      const valid = schema.isValidSync(createAvatar);

      if (!valid) throw new Error('[Avatar]: Parâmetros incompletos, verifique-os');

      // Verificando se o usuário existe

      const client = await clientRepository.findById(createAvatar.client_id);

      if (!client) throw new Error('[Avatar]: Usuário não econtrado.');

      // Criando classe

      const avatar = avatarRepository.create(createAvatar);

      await avatarRepository.save(avatar);

      // Anexar Avatar ao Usuário

      client.setImage(avatar);

      // Salvando no DB

      await clientRepository.save(client);

      return { result: avatar, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { CreateAvatarClientService };
