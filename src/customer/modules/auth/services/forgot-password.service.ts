import Client from '@core/client';
import ApiError from '@shared/utils/ApiError';
import { ServiceResponse } from '@shared/utils/service-response';
import SmsService from '@shared/utils/sms';
import { EmailToForgotPasswordDto } from '../dtos/email-forgot-password.dto';

export class ForgotPasswordService {
  async execute(forgotPasswordDto: EmailToForgotPasswordDto): Promise<ServiceResponse<boolean>> {
    try {
      const smsService = new SmsService();

      // pegando e verificando se o e-mail existe
      const client = await Client.findOne({
        where: { email: forgotPasswordDto.email },
        attributes: ['id', 'cellphone'],
      });

      if (!client) throw new ApiError('E-mail do usuário não encontrado');

      // checando o número e o código passados
      const sendResult = await smsService.send(client.getCellphone());

      if (!sendResult) {
        throw new ApiError('Houve um erro ao enviar o codigo, verifique o seu número de telefone e tente novamente');
      }

      if (forgotPasswordDto.password !== forgotPasswordDto.confirmPassword) {
        throw new ApiError('Senhas não são iguais');
      }

      client.setPassword(forgotPasswordDto.password);
      client.hashPassword();

      await client.save();

      return { result: true, err: null };
    } catch (err) {
      ApiError.verifyType(err)

      throw new ApiError('Erro ao recuperar senha', 'unknown');
    }
  };
}
