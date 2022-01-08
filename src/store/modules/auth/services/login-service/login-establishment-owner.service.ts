import { EstablishmentOwner } from '@core/establishment-owner';
import ApiError from '@shared/utils/ApiError';
import TokenManager from '@shared/utils/token-manager';
import { LoginEstablishmentOwnerDto } from '../../dtos/login-establishment';
import { IEstablishmentAuth } from '../../dtos/login-token-dto';
import loginValidation from '../../validation/login-establishment.validation';

export class LoginEstablishmentOwnerService {
  private tokenManager: TokenManager;

  constructor() {
    this.tokenManager = new TokenManager();
  }

  async execute(loginEstablishment: LoginEstablishmentOwnerDto): Promise<IEstablishmentAuth> {
    try {
      if (!loginValidation.isValidSync(loginEstablishment)) throw new ApiError('Dados inválidos.');

      const owner = await EstablishmentOwner.findOne({
        where: { email: loginEstablishment.email },
        attributes: ['password', 'id']
      });

      if (!owner) throw new ApiError('usuário não encontrado.');

      if (!owner.comparePassword(loginEstablishment.password)) throw new ApiError('Credenciais inválidas.');

      const token = this.tokenManager.create(owner.getId());
      const refreshToken = this.tokenManager.createRefreshToken(owner.getId());

      return { token, refreshToken };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
