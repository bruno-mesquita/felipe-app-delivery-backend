/**
 * @fileoverview Verificando se é o id do admin que está criando nessa rota
 */

import Admin from '@core/admin';
import { Request, Response, NextFunction } from 'express';

export async function accessAdmin(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    // Verificar o id do admin
    const adminId = request.client.id;

    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return response.status(401).json('[Acesso]: ID está ausente');
    }

    return next();
  } catch(err) {
    return response.status(401).json({ err: '[Falha no acesso]: ID inválido', type: 'Autenticação', message: 'ID Inválido' });
  }
}
