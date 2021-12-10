/**
 * @fileoverview Criação da classe SmsService, serviço de envio de mensagem
 *
 * @author Bruno Mesquita
 */

import axios, { AxiosInstance } from 'axios';
import ApiError from '../ApiError';

import { ApiSMSResponse, RequestBodySendToken, RequestBodyTokenVerify } from './types';

class SmsService {
  private api: AxiosInstance;

  constructor() {
    const { SMS_API_URL, SMS_KEY } = process.env;

    console.log(SMS_API_URL, SMS_KEY);

    this.api = axios.create({
      baseURL: SMS_API_URL,
      headers: {
        'auth-key': SMS_KEY,
      }
    });
  }

  /**
   * @param phone número do telefone DDD + Número
   */
  async sendCode(phone: string): Promise<void> {
    try {
      const { data } = await this.api.post<any, ApiSMSResponse, RequestBodySendToken>('/tokenmanager', {
        EnforceSecureValidation: true,
        ExpireInMinutes: '5m',
        Prefix: 'Flipp',
        PhoneNumber: phone
      });

      if(!data.Success) throw new ApiError('Erro ao enviar codigo de ativação');
    } catch (err) {
      console.log(err);
      ApiError.verifyType(err);

      throw new ApiError('Erro ao enviar codigo de ativação');
    }
  }

  async verifyCode(phone: string, code: string): Promise<void> {
    try {
      const { data } = await this.api.put<any, ApiSMSResponse, RequestBodyTokenVerify>('/tokenmanager', {
        PhoneNumber: phone,
        TokenCode: code
      });

      if(!data.Success) throw new ApiError('Código inválido solicite um novo código');
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Código inválido solicite um novo código');
    }
  }
}

export default SmsService;
