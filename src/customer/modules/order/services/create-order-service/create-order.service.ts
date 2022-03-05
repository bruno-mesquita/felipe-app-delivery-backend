import { Op } from 'sequelize';
import { getHours } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import AddressClient from '@core/address-client';
import Client from '@core/client';
import Establishment from '@core/establishment';
import ItemOrder from '@core/item-order';
import Order from '@core/order';
import Product from '@core/product';
import Notification from '@shared/utils/Notification';
import ApiError from '@shared/utils/ApiError';
import { EstablishmentOwner } from '@core/establishment-owner';
import { CreateOrderDto } from '../../dtos/create-order.dto';

export class CreateOrderService {
  private getCurrentHour(): number {
    const now = new Date();

    const timeZone = 'America/Sao_Paulo';
    const zonedDate = utcToZonedTime(now, timeZone);
    return getHours(zonedDate);
  }

  async execute({ establishmentId, ...rest }: CreateOrderDto): Promise<number> {
    try {
      // Fazendo validação DTO
      // const valid = schema.isValidSync(createOrderDto);

      // if (!valid) throw new ApiError('Campos inválidos');

      const currentHour = this.getCurrentHour();

      // Verificando Estabelecimento
      const establishment = await Establishment.findOne({
        where: {
          id: establishmentId,
          active: true,
          openingTime: {
            [Op.lte]: currentHour,
          },
          closingTime: {
            [Op.gt]: currentHour,
          },
        },
      });

      if (!establishment) throw new ApiError('Estabelecimento não encontrado ou fechado');

      // verificando cliente

      const client = await Client.findByPk(rest.clientId, { attributes: ['id'] });

      if (!client) throw new ApiError('Cliente não encontrado');

      // Verificando endereço do cliente

      const address = await AddressClient.findByPk(rest.addressId, { attributes: ['id'] });

      if (!address) throw new ApiError('Endereço do cliente não encontrado');

      // Criando o pedido
      const order = Order.build({
        establishment_id: establishment.id,
        client_id: client.id,
        address_id: address.id,
        freight_value: establishment.freightValue,
        transshipment: Number(rest.transshipment) || 0,
        note: rest.note,
        payment: rest.payment,
        total: Number(rest.total || 0),
      });

      order.open();

      await order.save();

      let total = 0;

      for await (const item of rest.items) {
        const product = await Product.findByPk(item.itemId, {
          attributes: ['id', 'price'],
        });

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

      order.setTotal(total + Number(establishment.freightValue));

      // Salvando produto no db
      await order.save();

      const notification = new Notification();

      const owner = await EstablishmentOwner.findOne({
        where: { establishment_id: establishment.id },
        attributes: ['id'],
      });

      await notification.send({
        targetId: owner.id,
        type: 'Partner',
        data: {
          title: 'Chegou um novo pedido para você!',
          body: 'Venha conferir',
        },
      });

      return order.getId();
    } catch (err) {
      ApiError.verifyType(err);

      throw ApiError.generateErrorUnknown();
    }
  }
}
