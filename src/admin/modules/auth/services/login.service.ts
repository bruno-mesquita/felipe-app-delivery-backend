import Admin from '@core/admin';
import ApiError from '@shared/utils/ApiError';
import TokenManager from '@shared/utils/token-manager';
import { LoginClientDto } from '../dtos/login-client.dto';
import loginValidation from '../validation/login.validation';

export class LoginClientService {
  async execute({ email, password }: LoginClientDto): Promise<{ token: string; refreshToken: string }> {
    try {
      if (!loginValidation.isValidSync({ email, password })) throw new ApiError('Dados inválidos');

      const tokenManager = new TokenManager();

      const admin = await Admin.findOne({ where: { email } });

      if (!admin) throw new ApiError('[erro]: E-mail ou senha incorreto');

      // Comparar senha digitada do cliente com a que foi salva no banco
      if (!admin.comparePassword(password)) throw new ApiError('Credenciais inválidas');

      return tokenManager.create(admin.getId());
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
