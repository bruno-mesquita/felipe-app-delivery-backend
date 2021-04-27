import { object, SchemaOf, string, boolean, number } from 'yup';

import { UpdateCityDto } from '../dtos/update-city-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<UpdateCityDto> = object({
  id: number().integer().positive().required(REQUIRED),
  name: string().required(REQUIRED),
  active: boolean().required(REQUIRED),
});

export { schema };
