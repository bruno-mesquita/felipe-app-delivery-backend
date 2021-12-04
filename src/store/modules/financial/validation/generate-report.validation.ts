import { object, SchemaOf, string, number } from 'yup';
import { GenerateReportDto } from '../dtos/generate-report.dto';

const schema: SchemaOf<GenerateReportDto> = object({
  id: number().integer().required(),
  data_initial: string().trim().required(),
  data_final: string().trim().required(),
});

export { schema };
