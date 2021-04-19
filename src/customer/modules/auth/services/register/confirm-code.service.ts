import ClientActivationCode from '@core/client-activation-code';

export class ConfirmCodeService {
  async execute(code: string) {
    try {
      const clientCode = await ClientActivationCode.findOne({ where: { code } });

      if (!clientCode) throw new Error();

      return { err: null, result: true };
    } catch (err) {
      return { err: 'Codigo invalido', result: false };
    }
  }
}
