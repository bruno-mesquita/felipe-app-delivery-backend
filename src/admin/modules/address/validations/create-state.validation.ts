import { object, SchemaOf, string, number } from 'yup';
import { StateAddressDto } from '../dtos/create-state-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<StateAddressDto> = object({
  name: string().required(REQUIRED),
});

export { schema };
