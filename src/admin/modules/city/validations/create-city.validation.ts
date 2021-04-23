import { object, SchemaOf, string, boolean, number } from 'yup';

import { CityAddressDto } from '../dtos/create-city-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CityAddressDto> = object({
  name: string().required(REQUIRED),
  state: number().integer().required(REQUIRED),
  active: boolean().required(REQUIRED),
});

export { schema };
