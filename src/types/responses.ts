export enum RiotErrorsEnum {
    BadRequest = 'Bad Request',
    Unauthorized = 'Unauthorized',
    Forbidden = 'Forbidden',
    DataNotFound = 'Data not found',
    MethodNotAllowed = 'Method Not Allowed',
    UnsupportedMediaType = 'Unsupported Media Type',
    RateLimitExceeded = 'Rate Limit Exceeded',
    InternalServerError = 'Internal Server Error',
    BadGateway = 'Bad Gateway',
    ServiceUnavailable = 'Service unavailable',
    GatewayTimeout = 'Gateway Timeout',
    UnknownError = 'Unknown Error',
}

export interface ErrorResponse {
    error: true;
    message: RiotErrorsEnum;
}

export interface successResponse {
    error: false;
}