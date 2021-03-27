import { object, SchemaOf, string } from 'yup';
import { CreateImageDto } from './create-image-dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateImageDto> = object({
  name: string().required(REQUIRED),
  encoded: string().required(REQUIRED),
  id: string().uuid().required(REQUIRED),
});

export { schema };
