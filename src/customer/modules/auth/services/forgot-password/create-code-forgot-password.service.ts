import Client from "@core/client";
import ClientActivationCode from "@core/client-activation-code";
import { ServiceResponse } from "@shared/utils/service-response";
import SmsService from "@shared/utils/sms";
import { EmailToForgotPasswordDto } from '../../dtos/email-forgot-password.dto';
import { schema as validationEmail } from '../../validation/email-forgot-password.validation';

export class CreateCodeForgotPasswordService {
  async execute({ email }: EmailToForgotPasswordDto): Promise<ServiceResponse<boolean | null>> {
    try {
      const smsService = new SmsService();

      // Validação
      const valid = validationEmail.isValidSync({ email });

      if (!valid) throw new Error('Dados inválidos');

      // pegando e verificando se o e-mail existe
      const emailExists = await Client.findOne({
        where: { email },
      });

      if (!emailExists) throw new Error('E-mail do usuário não encontrado');

      // criando código do usuário desse email selecionado
      const code = await ClientActivationCode.create({ client: emailExists, attempts: 0 });

      // checando o número e o código passados
      await smsService.send(emailExists.cellphone, code.getCode());

      return { result: true, err: null };
    } catch (err) {
      // console.log(err);
      return { err: 'Código inválido', result: false, };
    }
  };
}
