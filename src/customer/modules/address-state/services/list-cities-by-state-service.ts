import { ServiceResponse } from '@shared/utils/service-response';

class ListCitiesByStatesService {
  async execute(state_id: string): Promise<ServiceResponse<any[]>> {
    try {
      const statesRepository = getCustomRepository(AddressStateRepository);

      const states = await statesRepository.findOne({
        where: {
          id: state_id,
        },
        relations: ['cities'],
      });

      const result = states?.cities.map((city) => ({ id: city.getId(), name: city.name }));

      return { result, err: null };
    } catch (err) {
      return { result: [], err: err.message };
    }
  }
}

export { ListCitiesByStatesService };
