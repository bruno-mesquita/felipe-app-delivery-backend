import { ServiceResponse } from '@shared/utils/service-response';

export class FindProductsByMenuService {
  async execute(menuId: string): Promise<ServiceResponse<any[]>> {
    try {
      const menuRepository = getCustomRepository(MenuRepository);

      const menu = await menuRepository.findOne({
        where: { id: menuId },
        relations: ['products', 'products.image'],
      });

      if (!menu) throw new Error('Menu não encontrado');

      const products = menu.getProducts().map((product) => ({
        id: product.getId(),
        image: product.getImage().getEncoded(),
        name: product.getName(),
        description: product.getDescription(),
        price: product.getPrice(),
      }));

      return { result: products, err: null };
    } catch (err) {
      return { result: [], err: err.message };
    }
  }
}
