import { object, SchemaOf, string, boolean } from 'yup';

import { CityAddressDto } from '../dtos/create-city-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CityAddressDto> = object({
  name: string().required(REQUIRED),
  state: string().uuid().required(REQUIRED),
  active: boolean().required(REQUIRED),
});

export { schema };
