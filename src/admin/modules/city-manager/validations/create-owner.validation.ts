import { object, SchemaOf, string, boolean } from 'yup';

import { CityManagerDto } from '../dtos/city-manager-dtos';

const schema: SchemaOf<CityManagerDto> = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
  cellphone: string().required(),
  active: boolean().required(),
  city: string().required(),
});

export { schema };
