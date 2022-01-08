/**
 * @fileoverview Classe para manipulação do token
 *
 * @author Bruno Mesquita
 */

import { verify, sign } from 'jsonwebtoken';
import ApiError from '../ApiError';

class TokenManager {
  public check(token: string): { id: number } | null {
    try {
      const {  JWT_PASS } = process.env;

      return verify(token, JWT_PASS) as { id: number };
    } catch {
      throw new ApiError('Token invalido', 'auth', 401);
    }
  }

  public create(id: number): { token: string; refreshToken: string; } {
    try {
      const { JWT_EXPIRES, JWT_REFRESH_EXPIRES, JWT_PASS } = process.env;

      const token = sign({ id }, JWT_PASS, { expiresIn: JWT_EXPIRES });
      const refreshToken = sign({ id }, JWT_PASS, { expiresIn: JWT_REFRESH_EXPIRES });

    return { token, refreshToken }
    } catch (err) {
      throw new ApiError('Erro ao criar token de acesso', 'internal', 500);
    }
  }
}

export default TokenManager;
