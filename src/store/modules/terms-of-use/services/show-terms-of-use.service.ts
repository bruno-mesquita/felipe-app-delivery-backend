import TermsOfUse from '@core/terms-of-use';
import { ServiceResponse } from '@shared/utils/service-response';

export class ShowTermsOfUseService {
  async execute(): Promise<ServiceResponse<TermsOfUse | null>> {
    try {
      const termsOfUse = await TermsOfUse.findOne({
        attributes: ['description'],
      });

      return { result: termsOfUse, err: null };
    } catch (err) {
      return { result: null, err: err.message };
    }
  }
}
