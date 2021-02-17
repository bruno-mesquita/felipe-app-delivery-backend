/**

 * @fileoverview Criação do schema de validação para criação do produtos

 *

 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura

 */

import { object, SchemaOf, string, number } from 'yup';
import { CreateProductDto } from '../dtos/create-product-dto';

const REQUIRED = 'Campo obrigatório';

const schema: SchemaOf<CreateProductDto> = object({
  name: string().required(REQUIRED),
  price: number().required(REQUIRED),
  description: string().required(REQUIRED),
});
