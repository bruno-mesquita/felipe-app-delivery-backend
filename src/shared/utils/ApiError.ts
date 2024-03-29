type ApiErrorType = 'validate' | 'internal' | 'unknown' | 'auth';

class ApiError {
  message: string;

  type: ApiErrorType;

  statusCode: number;

  constructor(
    message: string,
    type: ApiErrorType = 'internal',
    statusCode = 400
  ) {
    this.message = message;
    this.type = type;
    this.statusCode = statusCode;
  }

  static verifyType(err: any) {
    if (err instanceof ApiError) throw err;
  }

  static generateErrorUnknown() {
    return new ApiError('Erro desconhecido', 'unknown', 500);
  }
}

export default ApiError;
