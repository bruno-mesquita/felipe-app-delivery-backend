/**
 * @fileoverview Criação do serviço para atualização de Produto
 *
 * @author Jonatas Rosa Moura
*/

import Menu from '@core/menu';
import Product from '@core/product';
import { ServiceResponse } from '@shared/utils/service-response';
import { UpdateProductDto } from '../../dtos/update-product-dto';
import updateProductValidation from '../../validation/update-product.validation';

export class UpdateProductService {
  async execute(updateProductDto: UpdateProductDto): Promise<ServiceResponse<boolean>> {
    try {
      // validando dto
      const valid = updateProductValidation.isValidSync(updateProductDto);

      if (!valid) throw new Error('Dados inválidos');

      // Verificando se o produto existe

      const product = await Product.findByPk(updateProductDto.id);

      if (!product) throw new Error('Produto não encontrado.');

      // Verificando se o Menu existe

      const menuExists = await Menu.findByPk(updateProductDto.menu);

      if (!menuExists) throw new Error('Menu não encontrado.');

      // Editando classe e Salvando no DB
      const { name, price, description, image, active } = updateProductDto;

      product.updateProduct(name, price, description, menuExists.id, active);

      const photo = await product.getPhoto();

      photo.setEncoded(image);

      await photo.save();
      await product.save();

      return { result: true, err: null };
    } catch (err) {
      return { err: err.message, result: null };
    }
  }
}
