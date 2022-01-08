/**
 * @fileoverview Service de login do app do cliente
 *
 * @author Bruno Mesquita
 */

import Admin from '@core/admin';
import ApiError from '@shared/utils/ApiError';
import TokenManager from '@shared/utils/token-manager';
import { LoginClientDto } from '../dtos/login-client.dto';
import loginValidation from '../validation/login.validation';

class LoginClientService {
  async execute(loginDto: LoginClientDto): Promise<{ token: string; refreshToken: string }> {
    try {
      if (!loginValidation.isValidSync(loginDto)) throw new ApiError('Dados inválidos');

      const tokenManager = new TokenManager();

      // Procurar pelo e-mail e pegar o avatar desse cliente
      const client = await Admin.findOne({
        where: { email: loginDto.email },
        attributes: ['id', 'password', 'email']
      });

      if (!client) throw new ApiError('[erro]: E-mail ou senha incorreto');

      // Comparar senha digitada do cliente com a que foi salva no banco

      if (!client.comparePassword(loginDto.password)) throw new ApiError('Credenciais inválidas');

      // Criando token
      const token = tokenManager.create(client.getId());

      const refreshToken = tokenManager.createRefreshToken(client.getId());

      const accessToken = { token, refreshToken };

      return accessToken;
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

export { LoginClientService };
