/**
 * @fileoverview Casos serviços para a criação do pedido
 * @author Jonatas Rosa Moura
 */
import AddressClient from '@core/address-client';
import Client from '@core/client';
import Establishment from '@core/establishment';
import ItemOrder from '@core/item-order';
import Order from '@core/order';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { schema } from '../../validation/create-order.validation';
import Notification from '@shared/utils/Notification';
import { EstablishmentOwner } from '@core/establishment-owner';
import ApiError from '@shared/utils/ApiError';

export class CreateOrderService {
  async execute(createOrderDto: CreateOrderDto): Promise<ServiceResponse<any>> {
    try {
      // Fazendo validação DTO
      const valid = schema.isValidSync(createOrderDto);

      if (!valid) throw new ApiError('Campos inválidos');

     // Verificando Estabelecimento
      const establishmentOwner = await EstablishmentOwner.findOne({
        where: {
          establishment_id: createOrderDto.establishment_id,
        },
        include: [{
          model: Establishment,
          as: 'establishment',
        }]
      });

      if (!establishmentOwner) throw new ApiError('Estabelecimento não encontrado');

      // verificando cliente

      const clientExists = await Client.findByPk(createOrderDto.client_id);

      if (!clientExists) throw new ApiError('Cliente não encontrado');

      // Verificando endereço do cliente

      const addressExists = await AddressClient.findOne({
        where: {
          id: createOrderDto.address_id,
        },
      });

      if (!addressExists) throw new ApiError('Endereço do cliente não encontrado');

      const ownerJson = establishmentOwner.toJSON() as any;

      // Criando o pedido
      const order = Order.build({
        establishment_id: ownerJson.establishment_id,
        client_id: clientExists.getId(),
        address_id: addressExists.getId(),
        freight_value: ownerJson.establishment.freightValue,
        transshipment: createOrderDto.transshipment,
        note: createOrderDto.note,
        payment: createOrderDto.payment,
        total: createOrderDto.total,
      });

      order.open();

      await order.save();

      let total = 0;

      for await (const item of createOrderDto.items) {
        const product = await Product.findByPk(item.itemId);

        if (product) {
          const tot = product.calcTotal(item.amount);

          total += tot;

          await ItemOrder.create({
            product_id: product.getId(),

            order_id: order.getId(),

            quantity: item.amount,

            total: tot,
          });
        }
      }

      order.setTotal(total);

      // Salvando produto no db
      await order.save();

      const notification = new Notification();

      await notification.send({
        targetId: establishmentOwner.getId(),
        type: 'Partner',
        data: {
          title: 'Chegou um novo pedido para você!',
          body: '',
          data: {},
        }
      });

      return { result: order.getId(), err: null };
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
