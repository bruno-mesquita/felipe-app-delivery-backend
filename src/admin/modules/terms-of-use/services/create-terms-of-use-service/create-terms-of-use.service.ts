import { CreateTermsOfUseDto } from '../../dtos/create-terms-of-use.dto';
import { ServiceResponse } from '@shared/utils/service-response';
import { schema } from '../../validations/create-state.validation';
import TermsOfUse from '@core/terms-of-use';

export class CreateTermsOfUseService {
  public async execute({ id, description }: CreateTermsOfUseDto): Promise<ServiceResponse<boolean>> {
    try {
      const valid = schema.isValidSync({ description });

      if (!valid) throw new Error('Dados inválidos');

      const termsOfUse = await TermsOfUse.findAll();

      if (termsOfUse.length > 0) throw new Error('Termos de Uso já cadastrado no sistema');

      await TermsOfUse.create({ description });
      return { result: true, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
