/**
 * @fileoverview Casos serviços para a criação do pedido
 * @author Jonatas Rosa Moura
 */
import { Op } from 'sequelize';
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

export class CreateOrderService {
  async execute(createOrderDto: CreateOrderDto): Promise<ServiceResponse<any>> {
    try {
      // Fazendo validação DTO
      const valid = schema.isValidSync(createOrderDto);

      if (!valid) throw new Error('Campos inválidos');

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

      if (!establishmentOwner) throw new Error('Estabelecimento não encontrado');

      // verificando cliente

      const clientExists = await Client.findByPk(createOrderDto.client_id);

      if (!clientExists) throw new Error('Cliente não encontrado');

      // Verificando endereço do cliente

      const addressExists = await AddressClient.findOne({
        where: {
          id: createOrderDto.address_id,
          street: { [Op.notIn]: ['Não informado', ''] },
          neighborhood: { [Op.notIn]: ['Não informado', ''] },
          number: { [Op.notIn]: ['Não informado', ''] },
        },
      });

      if (!addressExists) throw new Error('Endereço do cliente não encontrado');

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

      createOrderDto.items.map(async (item) => {
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
      });

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

      return { result: order.id, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
