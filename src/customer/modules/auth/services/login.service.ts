/**
 * @fileoverview Service de login do app do cliente
 *
 * @author Bruno Mesquita
 */

import Client from '@core/client';
import TokenManager from '@shared/utils/token-manager';
import ApiError from '@shared/utils/ApiError';

import { LoginClientDto } from '../dtos/login-client.dto';

interface Response {
  token: string;
  refreshToken: string;
}

export class LoginClientService {
  private tokenManager: TokenManager;

  constructor () {
    this.tokenManager = new TokenManager();
  }

  async execute(loginDto: LoginClientDto): Promise<Response> {
    try {
      // Procurar pelo e-mail e pegar o avatar desse cliente
      const client = await Client.findOne({
        where: { email: loginDto.email, active: true },
        attributes: ['id', 'password', 'email'],
      });

      if (!client) throw new ApiError('Usuário não encontrado', 'auth', 401);

      // Comparar senha digitada do cliente com a que foi salva no banco
      if (!client.comparePassword(loginDto.password)) {
        throw new ApiError('Credenciais inválidas', 'auth', 401);
      }

      return this.tokenManager.create(client.getId());
    } catch (err) {
      ApiError.verifyType(err);

      throw new ApiError('Erro interno', 'auth', 401);
    }
  }
}
