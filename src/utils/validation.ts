import {
  BaseReqConfig,
  ErrorResponse,
  ExecuteRegion,
  ExecuteRegionPlatform,
  LeagueClassSpawnConfig,
  LeagueSubClassSpawnConfig,
  RiotErrorsEnum,
} from '../types';

export function validateClassConfig(config: LeagueClassSpawnConfig): void {
    if (!config.apiKey || !config.apiKey.startsWith('RGAPI-')) {
        throw new Error('An valid API key must be provided');
    }

    if (!config.region || Object.values(ExecuteRegion).includes(config.region) === false) {
        throw new Error('An valid region must be provided');
    }

    if (!config.regionPlatform || Object.values(ExecuteRegionPlatform).includes(config.regionPlatform) === false) {
        throw new Error('An valid region platform must be provided');
    }
}

export function validateSubClassConfig(config: LeagueSubClassSpawnConfig): void {
    validateClassConfig(config);

    try {
        if (!config?.headers.has('User-Agent')) {
            throw new Error('Headers must be provided');
        }
    } catch (e) {
        throw new Error('Headers must be provided');
    }
}

export const SetBaseHeaders = ({ headers, customOrigin }: BaseReqConfig): void => {
    headers.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36');
    headers.append('Accept-Charset', 'application/x-www-form-urlencoded; charset=UTF-8');

    if (customOrigin) headers.append('Origin', customOrigin);
}

export const requestUrl = (url: string, config: LeagueClassSpawnConfig | LeagueSubClassSpawnConfig): string => {
    return encodeURI(url + "?api_key=" + config.apiKey);
}

export function errorStatusHandler(error: any): ErrorResponse {
    const status = error.response.status;

    function bodyAdd(error: RiotErrorsEnum): ErrorResponse {
        return {
            error: true,
            message: error
        }
    }

    switch (status) {
        case 400:
            return bodyAdd(RiotErrorsEnum.BadRequest);
        case 401:
            return bodyAdd(RiotErrorsEnum.Unauthorized);
        case 403:
            return bodyAdd(RiotErrorsEnum.Forbidden);
        case 404:
            return bodyAdd(RiotErrorsEnum.DataNotFound);
        case 405:
            return bodyAdd(RiotErrorsEnum.MethodNotAllowed);
        case 415:
            return bodyAdd(RiotErrorsEnum.UnsupportedMediaType);
        case 429:
            return bodyAdd(RiotErrorsEnum.RateLimitExceeded);
        case 500:
            return bodyAdd(RiotErrorsEnum.InternalServerError);
        case 502:
            return bodyAdd(RiotErrorsEnum.BadGateway);
        case 503:
            return bodyAdd(RiotErrorsEnum.ServiceUnavailable);
        case 504:
            return bodyAdd(RiotErrorsEnum.GatewayTimeout);
        default:
            return bodyAdd(RiotErrorsEnum.UnknownError);
    }
}