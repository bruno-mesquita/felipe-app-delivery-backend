/**

 * @fileoverview Casos serviços para a criação do pedido

 * @author Jonatas Rosa Moura

 */
import Establishment from '@core/establishment';
import ItemOrder from '@core/item-order';
import Order from '@core/order';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { schema } from '../../validation/create-order.validation';

export class CreateOrderService {
  async execute(createOrderDto: CreateOrderDto): Promise<ServiceResponse<any>> {
    try {
      // Fazendo validação DTO

      const valid = schema.isValidSync(createOrderDto);

      if (!valid) throw new Error('Campos inválidos');

      // Buscando o estabelecimento do pedido

      const establishmentExists = await Establishment.findByPk(createOrderDto.establishmentId);

      if (!establishmentExists) throw new Error('Estabelecimento não encontrado');

      // pedido

      // console.log({ ...createOrderDto, freight_value: establishmentExists.freightValue });

      // Salvando no db

      const order = await Order.create({
        ...createOrderDto,
        freight_value: establishmentExists.freightValue,
      });

      order.open();

      let total = 0;

      // Verificar os produtos

      createOrderDto.items.map(async (item) => {
        const product = await Product.findByPk(item.itemId);

        if (product) {
          const tot = product.calcTotal(item.amount);

          total += tot;

          await ItemOrder.create({
            product_id: product,

            order_id: order,

            quantity: item.amount,

            total: tot,
          });
        }
      });

      order.setTotal(total);

      const totalOrder = order.calcTotal();

      // Salvando produto no db

      await order.save();

      return { result: { totalOrder }, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
