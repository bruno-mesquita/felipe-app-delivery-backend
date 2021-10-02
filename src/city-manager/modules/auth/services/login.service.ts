import CityManager from '@core/city-manager';
import { ServiceResponse } from '@shared/utils/service-response';
import TokenManager from '@shared/utils/token-manager';
import { LoginDto } from '../dtos/login.dto';
import loginValidation from '../validation/login.validation';

class LoginCityManagerService {
  async execute(loginDto: LoginDto): Promise<ServiceResponse<{ token: string } | null>> {
    try {
      if (!loginValidation.isValidSync(loginDto)) throw new Error('Dados inválidos');

      const tokenManager = new TokenManager();

      // Procurar pelo e-mail e pegar o avatar desse cliente
      const cityManager = await CityManager.findOne({
        where: { email: loginDto.email },
        attributes: ['id', 'password', 'email']
      });

      if (!cityManager) throw new Error('[erro]: E-mail ou senha incorreto');

      // Comparar senha digitada do cliente com a que foi salva no banco

      if (!cityManager.comparePassword(loginDto.password)) throw new Error('Credenciais inválidas');

      // Criando token
      const token = tokenManager.create(cityManager.getId());
      const refreshToken = tokenManager.createRefreshToken(cityManager.getId());

      const accessToken = { token, refreshToken };

      return {
        result: accessToken, err: null,
      };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}

export { LoginCityManagerService };
