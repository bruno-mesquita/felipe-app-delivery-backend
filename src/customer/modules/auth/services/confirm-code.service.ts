import ClientActivationCode from '@core/client-activation-code';

export class ConfirmCodeService {
  async execute(code: string) {
    try {
      const clientActivationCodeRepository = getRepository(ClientActivationCode);

      const clientCode = await clientActivationCodeRepository.findOne({ where: { code }, relations: ['client'] });

      if (!clientCode) throw new Error();

      return { err: null, result: true };
    } catch (err) {
      return { err: 'Codigo invalido', result: false };
    }
  }
}
