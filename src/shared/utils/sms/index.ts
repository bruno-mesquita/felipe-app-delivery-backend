/**
 * @fileoverview Criação da classe SmsService, serviço de envio de mensagem
 *
 * @author Bruno Mesquita
 */

class SmsService {
  /**
   * @param phone número do telefone
   * @param code codigo de ativação
   */
  async send(phone: string): Promise<boolean> {
    return true;
  }

  async verifyCode(code: string): Promise<boolean> {
    return true;
  }
}

export default SmsService;
