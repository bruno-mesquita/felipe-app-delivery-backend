import { object, SchemaOf, string, boolean } from 'yup';
import { StateAddressDto } from '../dtos/create-state-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<StateAddressDto> = object({
  name: string().required(REQUIRED),
  active: boolean().required(REQUIRED),
});

export { schema };
