import { ServiceResponse } from '@shared/utils/service-response';

export class SearchEstablishmentsByName {
  async execute(searchName: string, cityId: string): Promise<ServiceResponse<any[]>> {
    try {
      const establishmentRepository = getCustomRepository(EstablishmentRepository);

      const establishments = await establishmentRepository.find({
        where: { name: Like(`%${searchName}%`) },
        select: ['menus', 'image', 'id', 'name', 'freightValue', 'address'],
        relations: ['menus', 'image', 'address', 'address.city'],
      });

      const result = establishments
        /* .filter((item) => item.getAddress().getCity().getId() === cityId) */
        .map((establishment) => ({
          id: establishment.getId(),
          name: establishment.getName(),
          fee: establishment.getFreightValue(),
          photo: establishment.getImage().getEncoded(),
          menus: establishment.getMenus().map((menu) => ({ id: menu.getId(), name: menu.getName() })),
          time: {
            open: establishment.openingTime,
            close: establishment.closingTime,
          },
        }));
      return { result, err: null };
    } catch (err) {
      return { result: [], err: err.message };
    }
  }
}
