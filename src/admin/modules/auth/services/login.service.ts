/**
 * @fileoverview Service de login do app do cliente
 *
 * @author Bruno Mesquita
 */

import { compareSync } from 'bcryptjs';

import User from '@core/schemas/user.schema';
import ApiError from '@shared/utils/ApiError';
import TokenManager from '@shared/utils/token-manager';
import { LoginClientDto } from '../dtos/login-client.dto';
import loginValidation from '../validation/login.validation';

class LoginClientService {
  async execute(loginDto: LoginClientDto): Promise<{ token: string; refreshToken: string }> {
    try {
      if (!loginValidation.isValidSync(loginDto)) throw new ApiError('Dados inválidos');

      const tokenManager = new TokenManager();

      const admin = (await User.aggregate([
        { $match: { email: loginDto.email } },
      ]))[0]

      if (!admin) throw new ApiError('[erro]: E-mail ou senha incorreto');

      // Comparar senha digitada do cliente com a que foi salva no banco
      if (!compareSync(loginDto.password, admin.password)) throw new ApiError('Credenciais inválidas');

      return tokenManager.create(admin._id);
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}

export { LoginClientService };
