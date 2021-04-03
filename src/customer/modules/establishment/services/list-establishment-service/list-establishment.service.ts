/**
 * @fileoverview serviço de listagem dos estabelecimentos
 *
 * @author Jonatas Rosa Moura
 */

import { ServiceResponse } from '@shared/utils/service-response';

class ListEstablishmentService {
  async execute(city_id: string, category_id: string): Promise<ServiceResponse<any[]>> {
    try {
      const categoryRepository = getCustomRepository(CategoryRepository);
      const cityAddressRepository = getCustomRepository(AddressClientRepository);
      const categoryEstablishmentRepository = getCustomRepository(EstablishmentCategoryRepository);

      // Encontrar uma cidade

      /*  const city = await cityAddressRepository.findById(city_id); */

      // Encontrar uma categoria

      const category = await categoryRepository.findById(category_id);

      // Encontrar os estabelecimentos

      const categoryEstablishment = await categoryEstablishmentRepository.find({
        where: { category },
        relations: ['establishment', 'establishment.image', 'establishment.address', 'establishment.address.city'],
      });

      // Filtrar os estabelecimentos que fazem parte das categorias de uma cidade

      // const cityAddress = categoryEstablishment.filter((item) => item.establishment.address.city.getId() === city_id);

      const result = categoryEstablishment.map(({ establishment }) => {
        return {
          id: establishment.getId(),
          name: establishment.getName(),
          fee: establishment.getFreightValue(),
          photo: establishment.getImage().getEncoded(),
          time: {
            open: establishment.openingTime,
            close: establishment.closingTime,
          },
        };
      });

      return { result, err: null };
    } catch (err) {
      return { result: [], err: err.null };
    }
  }
}

export { ListEstablishmentService };
