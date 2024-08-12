import axios from 'axios';

import {
  ExecuteRegion,
  ExecuteRegionPlatform,
  LeagueClassSpawnConfig,
  LeagueSubClassSpawnConfig,
} from '../src/types';

const apiKey = "MY_API_KEY";

const ValidHeadersMock: Headers = new Headers()
ValidHeadersMock.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36');
ValidHeadersMock.append('Accept-Charset', 'application/x-www-form-urlencoded; charset=UTF-8');

export const fakeValidApikeyMock = apiKey;
export const fakeValidHeadersMock = ValidHeadersMock;

export const ValidConfigMock: LeagueClassSpawnConfig = {
    apiKey: apiKey,
    region: ExecuteRegion.AMERICAS,
    regionPlatform: ExecuteRegionPlatform.EUN1
}

export const ValidSubClassConfigMock: LeagueSubClassSpawnConfig = {
    ...ValidConfigMock,
    headers: ValidHeadersMock,
    axiosInstance: axios.create({
        baseURL: ValidConfigMock.region,
        headers: Object.fromEntries(ValidHeadersMock)
    }),
    axiosPlatformInstance: axios.create({
        baseURL: ValidConfigMock.regionPlatform,
        headers: Object.fromEntries(ValidHeadersMock)
    })
}

export const InvalidApiKeyConfigMock: LeagueClassSpawnConfig = {
    apiKey: '',
    region: ExecuteRegion.AMERICAS,
    regionPlatform: ExecuteRegionPlatform.EUN1
}

export const InvalidRegionConfigMock: LeagueClassSpawnConfig = {
    apiKey: apiKey,
    region: 'invalid region' as ExecuteRegion,
    regionPlatform: ExecuteRegionPlatform.EUN1
}

export const InvalidRegionPlatformconfigMock: LeagueClassSpawnConfig = {
    apiKey: apiKey,
    region: ExecuteRegion.EUROPE,
    regionPlatform: 'invalid region platform' as ExecuteRegionPlatform
}

export const InvalidSubClassConfigMock: LeagueSubClassSpawnConfig = {
    apiKey: apiKey,
    region: ExecuteRegion.AMERICAS,
    regionPlatform: ExecuteRegionPlatform.EUN1,
    headers: {} as Headers,
    axiosInstance: axios.create({
        baseURL: ExecuteRegion.AMERICAS,
        headers: Object.fromEntries(ValidHeadersMock)
    }),
    axiosPlatformInstance: axios.create({
        baseURL: ExecuteRegionPlatform.EUN1,
        headers: Object.fromEntries(ValidHeadersMock)
    })
}