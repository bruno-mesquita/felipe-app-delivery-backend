/**
 * @fileoverview Service de login do app do cliente
 *
 * @author Bruno Mesquita
 */

import Admin from '@core/admin';
import { ServiceResponse } from '@shared/utils/service-response';
import TokenManager from '@shared/utils/token-manager';
import { LoginClientDto } from '../dtos/login-client.dto';
import loginValidation from '../validation/login.validation';

class LoginClientService {
  async execute(loginDto: LoginClientDto): Promise<ServiceResponse<{ token: string } | null>> {
    try {
      if (!loginValidation.isValidSync(loginDto)) throw new Error('Dados inválidos');

      const tokenManager = new TokenManager();

      // Procurar pelo e-mail e pegar o avatar desse cliente
      const client = await Admin.findOne({
        where: { email: loginDto.email },
        attributes: ['id', 'password', 'email']
      });

      if (!client) throw new Error('[erro]: E-mail ou senha incorreto');

      // Comparar senha digitada do cliente com a que foi salva no banco

      if (!client.comparePassword(loginDto.password)) throw new Error('Credenciais inválidas');

      // Criando token
      const token = tokenManager.create(client.getId());

      const refreshToken = tokenManager.createRefreshToken(client.getId());

      const accessToken = { token, refreshToken };

      return {
        result: accessToken, err: null,
      };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { LoginClientService };
