import { ServiceResponse } from '@shared/utils/service-response';

export default class ProfileClientService {
  async execute(id: string): Promise<ServiceResponse<any>> {
    try {
      const clientRepository = getCustomRepository(ClientRepository);

      // Trasendo dados do Perfil do cliente

      const client = await clientRepository.findByProfile(id);

      return {
        result: {
          avatar: client.image ? `${client.image.getEncoded()}` : null,
          name: client.name,
          email: client.email,
          cpf: client.cpf,
          cellphone: client.cellphone,
        },
        err: null,
      };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
