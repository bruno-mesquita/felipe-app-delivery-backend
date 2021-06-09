import { Request, Response, NextFunction } from 'express';

import { EstablishmentOwner } from '@core/establishment-owner';

 export async function accessEstablishmentOwner(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
   try {
    // Verificar o id do admin
    const ownerId = request.client.id;

    const store = await EstablishmentOwner.findByPk(ownerId, { attributes: ['id', 'establishment_id'] });

    if (!store) {
      return response.status(401).json('[Acesso]: ID está ausente');
    }

    request.client.entity = store as any;

    return next();
  } catch(err) {
    return response.status(401).json({ err: '[Falha no acesso]: ID inválido', type: 'Autenticação', message: 'ID Inválido' });
  }
}
