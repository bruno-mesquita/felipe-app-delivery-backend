import { AxiosResponse } from 'axios';

export type ApiSMSResponse = AxiosResponse<{
  Success: boolean;
  Object: {
    Prefix: string;
    PhoneNumber: string;
    ExpireInMinutes: string;
    EnforceSecureValidation: string;
    TokenCode: string;
  }
  Message: string;
}>;

export interface RequestBodySendToken {
  PhoneNumber: string;
  Prefix: string;
  EnforceSecureValidation: boolean;
  ExpireInMinutes: string;
}


export interface RequestBodyTokenVerify {
  TokenCode:string;
  PhoneNumber: string;
}
