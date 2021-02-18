/**

 * @fileoverview Criação do serviço para atualização de Produto
 *
 * @author Jonatas Rosa Moura

*/

import { getCustomRepository } from 'typeorm';
import { UpdateProductDto } from '@modules/product/dtos/update-product-dto';
import { ServiceResponse } from '@shared/utils/service-response';
import { ProductRepository } from '@modules/product/typeorm/repository/product.repository';
import updateProductValidation from '@modules/product/validation/update-product.validation';
import Product from '@modules/product/typeorm/entity/product.entity';

export class UpdateProductService {
  async execute(updateProductDto: UpdateProductDto): Promise<ServiceResponse<Product | null>> {
    try {
      const productRepository = getCustomRepository(ProductRepository);

      // validando dto

      const valid = updateProductValidation.isValidSync(updateProductDto);

      if (!valid) throw new Error('Dados inválidos');

      // Verificando se o produto existe

      const product = await productRepository.findById(updateProductDto.id);

      if (!product) throw new Error('Produto não encontrado.');

      await productRepository.save(product);

      return { result: product, err: null };
    } catch (err) {
      return { err: err.message, result: null };
    }
  }
}
