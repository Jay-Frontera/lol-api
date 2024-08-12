import { Axios } from 'axios';

import {
  ExecuteRegion,
  ExecuteRegionPlatform,
} from '../';

export interface LeagueClassSpawnConfig {
    apiKey: string,
    region: ExecuteRegion,
    regionPlatform: ExecuteRegionPlatform
}

export interface LeagueSubClassSpawnConfig extends LeagueClassSpawnConfig {
    headers: Headers,
    axiosInstance: Axios,
    axiosPlatformInstance: Axios
}

export interface BaseReqConfig {
    customOrigin?: string;
    headers: Headers;
}