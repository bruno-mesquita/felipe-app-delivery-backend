import { object, SchemaOf, string } from 'yup';
import { CreateTermsOfUseDto } from '../dtos/create-terms-of-use.dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateTermsOfUseDto> = object({
  description: string().required(REQUIRED),
});

export { schema };
