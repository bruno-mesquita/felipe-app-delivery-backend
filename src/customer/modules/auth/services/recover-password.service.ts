import { getRepository } from 'typeorm';

import Client from '@core/client';
import SmsService from '@shared/utils/sms';
import ClientActivationCode from '@core/client-activation-code';

export class RecoverPasswordService {
  async execute(email: string) {
    try {
      const userRepository = getRepository(Client);
      const clientActivationCodeRepository = getRepository(ClientActivationCode);
      const smsService = new SmsService();

      const user = await userRepository.findOne({ where: { email }, select: ['id', 'name', 'cellphone'] });

      if (!user) throw new Error('Usuário não encontrado');

      const clientCode = clientActivationCodeRepository.create({ client: user, attempts: 0 });

      await clientActivationCodeRepository.save(clientCode);

      await smsService.send(user.getCellphone(), clientCode.getCode());

      return { err: null, result: true };
    } catch (err) {
      return { err: 'Erro ao tentar recuperar a senha', result: false };
    }
  }
}
