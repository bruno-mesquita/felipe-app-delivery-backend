import { getCustomRepository } from 'typeorm';
import { ServiceResponse } from '@shared/utils/service-response';
import ClientRepository from '../../client.repository';

export default class ProfileClientService {
  async execute(id: string): Promise<ServiceResponse<any>> {
    try {
      const clientRepository = getCustomRepository(ClientRepository);

      const clientExists = await clientRepository.findByUserId(id);

      if (!clientExists) throw new Error('Perfil do usuário não encontrado');

      const client = clientExists.map((clientProfile) => {
        const name = clientProfile.getName();

        const email = clientProfile.getEmail();

        const cpf = clientProfile.getCpf();

        const cellphone = clientProfile.getCellphone();

        const image = clientProfile.getImage() ? `${clientProfile.getImage().getId()}` : ``;

        return {
          id: clientProfile.getId(),
          name,
          email,
          cpf,
          cellphone,
          image,
        };
      });

      return { result: client, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
