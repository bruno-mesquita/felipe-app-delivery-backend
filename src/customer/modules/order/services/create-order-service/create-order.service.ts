/**

 * @fileoverview Casos serviços para a criação do pedido

 * @author Jonatas Rosa Moura

 */
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { schema } from '../../validation/create-order.validation';

export class CreateOrderService {
  async execute(createOrderDto: CreateOrderDto): Promise<ServiceResponse<any>> {
    try {
      const orderRepository = getCustomRepository(OrderRepository);

      const itemOrderRepository = getCustomRepository(ItemOrderRepository);

      const productRepository = getCustomRepository(ProductRepository);

      const establishmentRepository = getCustomRepository(EstablishmentRepository);

      // Fazendo validação DTO

      const valid = schema.isValidSync(createOrderDto);

      if (!valid) throw new Error('Campos inválidos');

      // Buscando o estabelecimento do pedido

      const establishmentExists = await establishmentRepository.findById(createOrderDto.establishmentId);

      if (!establishmentExists) throw new Error('Estabelecimento não encontrado');

      // pedido

      // console.log({ ...createOrderDto, freight_value: establishmentExists.freightValue });

      const order = orderRepository.create({
        ...createOrderDto,
        freight_value: establishmentExists.freightValue,
      });

      order.open();

      // Salvando no db

      await orderRepository.save(order);

      let total = 0;

      // Verificar os produtos

      createOrderDto.items.map(async (item) => {
        const product = await productRepository.findById(item.itemId);

        if (product) {
          const tot = product.calcTotal(item.amount);

          total += tot;

          const itemOrder = itemOrderRepository.create({
            product_id: product,

            order_id: order,

            quantity: item.amount,

            total: tot,
          });

          await itemOrderRepository.save(itemOrder);
        }
      });

      order.setTotal(total);

      const totalOrder = order.calcTotal();

      // Salvando produto no db

      await orderRepository.save(order);

      return { result: { totalOrder }, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
