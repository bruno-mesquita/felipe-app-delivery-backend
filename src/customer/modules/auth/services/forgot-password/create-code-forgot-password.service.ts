import Client from "@core/client";
import { ServiceResponse } from "@shared/utils/service-response";
import SmsService from "@shared/utils/sms";
import { EmailToForgotPasswordDto } from '../../dtos/email-forgot-password.dto';
import { schema as validationEmail } from '../../validation/forgot-password.validation';

export class CreateCodeForgotPasswordService {
  async execute(forgotPasswordDto: EmailToForgotPasswordDto): Promise<ServiceResponse<boolean | null>> {
    try {
      const smsService = new SmsService();

      // Validação
      const valid = validationEmail.isValidSync(forgotPasswordDto);

      if (!valid) throw new Error('Dados inválidos');

      // pegando e verificando se o e-mail existe
      const client = await Client.findOne({
        where: { email: forgotPasswordDto.email },
        attributes: ['id', 'cellphone'],
      });

      if (!client) throw new Error('E-mail do usuário não encontrado');

      // checando o número e o código passados
      const sendResult = await smsService.send(client.cellphone);

      if (!sendResult) {
        throw new Error('Houve um erro ao enviar o codigo, verifique o seu número de telefone e tente novamente');
      }

      if (forgotPasswordDto.password !== forgotPasswordDto.confirmPassword) {
        throw new Error('Senhas não são iguais');
      }

      const { password } = forgotPasswordDto;

      client.setPassword(password);

      client.hashPassword();

      await client.save();

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: false, };
    }
  };
}
