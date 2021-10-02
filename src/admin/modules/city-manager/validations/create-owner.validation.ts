import { object, SchemaOf, string, boolean, number } from 'yup';

import { CityManagerDto } from '../dtos/city-manager-dtos';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CityManagerDto> = object({
  name: string().required(REQUIRED),
  email: string().email().required(REQUIRED),
  password: string().required(REQUIRED),
  cellphone: string().required(REQUIRED),
  active: boolean().required(REQUIRED),
  city_of_action_id: number().integer().positive().required(REQUIRED),
});

export { schema };
