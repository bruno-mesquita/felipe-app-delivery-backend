/**
 * @fileoverview verificar se o usuário está autenticado -> middleware de autenticação -> proteger as rotas que vão ser verificadas
 * @author Jonatas Rosa Moura
 */

import { Request, Response, NextFunction } from 'express';

import TokenManager from '@shared/utils/token-manager';

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authConfig = new TokenManager();
  // verificar se no cabeçalho existe um token

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('[Falha de autenticação]: JWT Token está ausente.');
  }

  // array token vai ter 2 posições -> Bearer açsd6464JAFPO(&&%/;). -> chave secreta (token)

  const [, token] = authHeader.split(' ');

  // verificar se esse token foi criado pela minha aplicação, se ele é válido (se eu posso liberar o acesso)

  try {
    const decodedToken = authConfig.check(token);

    request.client = {
      id: decodedToken.id,
    };

    return next();
  } catch (err) {
    throw new Error('Token JWT Inválido.');
  }
}
