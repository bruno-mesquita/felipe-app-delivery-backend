import Order from '@core/order';
import { ServiceResponse } from '@shared/utils/service-response';
import { getCustomRepository } from 'typeorm';
import { UpdateOrderDto } from '../../dtos/update-order.dto';
import { OrderRepository } from '../../repository/order-repository';
import { schema as updateOrderValidation } from '../../validation/update-order.validation';

class UpdateOrderservice {
  async execute(updateOrderDto: UpdateOrderDto): Promise<ServiceResponse<Order | null>> {
    try {
      const orderRepository = getCustomRepository(OrderRepository);

      // validando dto

      const valid = updateOrderValidation.isValidSync(updateOrderDto);

      if (!valid) throw new Error('Dados inválido');

      // verificando se o pedido existe

      const order = await orderRepository.findById(updateOrderDto.id);

      if (!order) throw new Error('Pedido não encontrado.');

      const { form_of_payment } = updateOrderDto;

      order.updateOrder(form_of_payment);

      await orderRepository.save(order);

      return { result: order, err: null };
    } catch (err) {
      return { err: err.message, result: null };
    }
  }
}

export { UpdateOrderservice };
