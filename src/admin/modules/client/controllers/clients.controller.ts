import { Request, Response } from 'express';
import ListClientService from '../services/list-client-service';

class ClientsAdminController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listClient = new ListClientService();

    const clients = await listClient.execute();

    return response.json(clients);
  }
}

export default ClientsAdminController;
