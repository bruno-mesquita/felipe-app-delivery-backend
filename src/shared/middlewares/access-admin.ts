/**
 * @fileoverview Verificando se é o id do admin que está criando nessa rota
 */

import User from '@core/schemas/user.schema';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

export async function accessAdmin(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    // Verificar o id do admin
    const adminId = request.client.id;
    // const apiType = request.headers.apiType as string || 'old';

    const admin = await User.aggregate([
      { $match: { _id: new Types.ObjectId(adminId) } }
    ]);

    if (admin.length !== 1) {
      return response.status(401).json('[Acesso]: ID está ausente');
    }

    request.client.entity = admin[0];

    return next();
  } catch(err) {
    return response.status(401).json({ err: '[Falha no acesso]: ID inválido', type: 'Autenticação', message: 'ID Inválido' });
  }
}
