type ApiErrorType = 'validate' | 'internal' | 'unknown';

class ApiError {
  message: string;
  type: ApiErrorType;
  statusCode: number;

  constructor(message: string, type: ApiErrorType = 'internal', statusCode = 400) {
    this.message = message;
    this.type = type;
    this.statusCode = statusCode;
  }

  static verifyType(err: any) {
    if(err instanceof ApiError) throw err;
  }
}

export default ApiError;
