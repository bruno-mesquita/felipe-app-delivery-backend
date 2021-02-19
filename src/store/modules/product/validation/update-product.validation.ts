/**

 * @fileoverview Criação do schema de validação para atualização do Produto

 * @author Jonatas Rosa Moura

*/

import { object, SchemaOf, string, number } from 'yup';

import { UpdateProductDto } from '../dtos/update-product-dto';

// Tirar dúvia com Bruno, sobre essa parte

const schema: SchemaOf<UpdateProductDto> = object({
  id: string().required(),

  name: string().required(),

  price: number().required(),

  description: string().required(),
});

export default schema;