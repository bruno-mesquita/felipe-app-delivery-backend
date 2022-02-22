import CityManager from '@core/city-manager';
import ApiError from '@shared/utils/ApiError';
import TokenManager from '@shared/utils/token-manager';
import { ILoginDto } from '../dtos';

export class LoginCityManagerService {
  private tokenManager: TokenManager;

  constructor() {
    this.tokenManager = new TokenManager();
  }

  async execute(
    loginDto: ILoginDto
  ): Promise<{ token: string; refreshToken: string }> {
    try {
      // Procurar pelo e-mail e pegar o avatar desse cliente
      const cityManager = await CityManager.findOne({
        where: { email: loginDto.email },
        attributes: ['id', 'password', 'email'],
      });

      if (!cityManager)
        throw new ApiError('Credenciais inválidas', 'auth', 401);

      // Comparar senha digitada do cliente com a que foi salva no banco

      if (!cityManager.comparePassword(loginDto.password))
        throw new ApiError('Credenciais inválidas', 'auth', 401);

      return this.tokenManager.create(cityManager.getId());
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
