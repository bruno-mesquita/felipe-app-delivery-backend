import { object, SchemaOf, string, number } from 'yup';
import { CreateTermsOfUseDto } from '../dtos/create-terms-of-use.dto';

const REQUIRED = 'Campo obrigátorio';

const schema: SchemaOf<CreateTermsOfUseDto> = object({
  id: number().integer().required(REQUIRED),
  description: string().required(REQUIRED),
});

export { schema };
