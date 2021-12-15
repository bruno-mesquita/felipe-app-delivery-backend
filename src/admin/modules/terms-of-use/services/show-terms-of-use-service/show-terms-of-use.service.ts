import { ServiceResponse } from "@utils/service-response";
import TermsOfUse from "@core/terms-of-use";

export class ShowTermsOfUse {
  async execute(): Promise<ServiceResponse<TermsOfUse | null>> {
    try {
      const termsOfUse = await TermsOfUse.findOne({
        attributes: ['description']
      });

      return { result: termsOfUse, err: null  };
    } catch(err) {
      return { result: null, err: err.message };
    }
  }
}
