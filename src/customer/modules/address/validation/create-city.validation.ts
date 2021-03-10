import { object, SchemaOf, string, number } from 'yup';
import { CityAddressDto } from '../dtos/create-city-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CityAddressDto> = object({
  name: string().required(REQUIRED),
});

export { schema };
