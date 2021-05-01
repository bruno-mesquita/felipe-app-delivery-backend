/**
 * @fileoverview Verificando se é o id do admin que está criando nessa rota
 */

 import Establishment from '@core/establishment';
 import { Request, Response, NextFunction } from 'express';

 export async function accessEstablishment(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
   try {
    // Verificar o id do admin
    const storeId = request.client.id;

    const store = await Establishment.findByPk(storeId);

    if (!store) {
      return response.status(401).json('[Acesso]: ID está ausente');
    }

    return next();
  } catch(err) {
    return response.status(401).json({ err: '[Falha no acesso]: ID inválido', type: 'Autenticação', message: 'ID Inválido' });
  }
}
