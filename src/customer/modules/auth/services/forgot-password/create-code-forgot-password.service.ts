import Client from "@core/client";
import ClientActivationCode from "@core/client-activation-code";
import { ServiceResponse } from "@shared/utils/service-response";
import { TakeEmailToForgotPassword } from '../../dtos/take-email-forgot-password.dto';
import { schema as validationEmail } from '../../validation/take-email-forgot-password.validation';

export class CreateCodeForgotPasswordService {
  async execute({ email, code }: TakeEmailToForgotPassword): Promise<ServiceResponse<boolean | null>> {
    try {
      // Validação
      const valid = validationEmail.isValidSync({ email, code });

      if (!valid) throw new Error('Dados inválidos');

      // pegando e verificando se o e-mail existe
      const emailExists = await Client.findOne({
        where: { email },
      });

      if (!emailExists) throw new Error('E-mail não encontrado no sistema');

      // Enviando código para o cliente

      const codeClient = await ClientActivationCode.findOne({
        where: { code },
      });

      if (!codeClient) throw new Error();

      return { result: true, err: null };
    } catch (err) {
      return { result: false, err: 'Código inválido' };
    }
  };
}
