import { object, SchemaOf, string, boolean } from 'yup';
import { CreateStateADto } from '../dtos/create-state-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateStateADto> = object({
  name: string().required(REQUIRED),
  active: boolean().required(REQUIRED),
});

export { schema };
