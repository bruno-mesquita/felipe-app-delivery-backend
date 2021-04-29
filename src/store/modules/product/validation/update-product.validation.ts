import { object, SchemaOf, string, number } from 'yup';

import { UpdateProductDto } from '../dtos/update-product-dto';

const schema: SchemaOf<UpdateProductDto> = object({
  id: number().integer().required(),
  name: string().required(),
  price: number().required(),
  description: string().required(),
  menu: number().integer().required(),
  image: string().required(),
});

export default schema;
