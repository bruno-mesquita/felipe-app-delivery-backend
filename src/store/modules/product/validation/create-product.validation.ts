/**

 * @fileoverview Criação do schema de validação para criação do produtos

 *

 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura

 */

import { object, SchemaOf, string, number, boolean } from 'yup';
import { CreateProductDto } from '../dtos/create-product-dto';

const REQUIRED = 'Campo obrigatório';

const schema: SchemaOf<CreateProductDto> = object({
  name: string().required(),
  price: number().required(),
  description: string().max(150).required(),
  menu: number().integer().required(),
  image: string().required(),
  active: boolean().required(),
});

export default schema;
