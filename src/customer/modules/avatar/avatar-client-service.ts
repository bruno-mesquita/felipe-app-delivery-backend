import Image from '@core/image';
import { ServiceResponse } from '@shared/utils/service-response';
import { getCustomRepository } from 'typeorm';

import { AvatarRepository } from './avatar-repository';
import { CreateAvatarDto } from './create-avatar-dto';
import { schema } from './create-avatar-validation';

class AvatarClientService {
  async execute(createAvatar: CreateAvatarDto): Promise<ServiceResponse<Image | null>> {
    try {
      const avatarRepository = getCustomRepository(AvatarRepository);

      // Validar dados

      const valid = schema.isValidSync(createAvatar);

      if (!valid) throw new Error('[Avatar]: Parâmetros incompletos, verifique-os');

      const avatar = avatarRepository.create(createAvatar);

      await avatarRepository.save(avatar);

      return { result: avatar, err: null };
    } catch (err) {
      return { result: err, err: err.message };
    }
  }
}

export { AvatarClientService };
