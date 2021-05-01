import { object, SchemaOf, string, number } from 'yup';
import { UpdateTermsOfUseDto } from '../dtos/update-terms-of-use.dto';

const REQUIRED = 'Campo obrigátorio';

export const schema: SchemaOf<UpdateTermsOfUseDto> = object({
  id: number().integer().required(REQUIRED),
  description: string().required(REQUIRED),
});
